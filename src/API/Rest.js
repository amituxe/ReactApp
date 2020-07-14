import Rest, { headers, buildQuery } from 'grommet/utils/Rest';
import RestWatch from './RestWatch';
import { watchItem, stopWatching } from '../api/watch';
import { getWindow } from './Browser';
import { intlFormattedMessage } from './MessagesIntlFormat';
import messages from './messages';

let sessionStorage = getWindow().sessionStorage;
let PUBLIC_PREFIX = '/hp/rest/provisioning/{0}/system/v2';
let _headers = {
  ...headers,
  'Accept': 'application/json',
  'Auth': sessionStorage.sessionID,
  'Content-Type': 'application/json',
  'HP-MGMT-UI-VERSION': 1.0,
  'Authorization': sessionStorage.access_token,
  'X-API-Version': 1,
  'X-Requested-With': 'XMLHttpRequest'
};

export const dispatchErrorAndStopWatcher = function(dispatch, error, FAILURE) {
  unloadAsyncCall();
  dispatch({ type: FAILURE, error });
};

export const refresh=function() {
  RestWatch.refresh();
};

export const getHeaders=function() {
  return {..._headers};
};

export const updateHeader=function(name, value) {
  _headers = {..._headers};
  _headers[name] = value;
  Rest.setHeaders(_headers);
};

export const getPublicRESTPrefix=function() {
  let prefix;
  let systemID = sessionStorage.remoteSystemID || sessionStorage.systemID;
  if (systemID) {
    prefix = PUBLIC_PREFIX.replace('{0}', systemID);
  }
  return prefix;
};

export const getServerName=function() {
  return sessionStorage.remoteServerName || sessionStorage.serverName;
};

export const updateHeaders=function(headers) {
  _headers = {..._headers, ...headers};
  Rest.setHeaders(_headers);
};

export const asyncronousCall=function(dispatch, id, SUCCESS, FAILURE, RUNNING, retryParams) {
  let retryCount=0;
  watchItem('asyncCall', `/pml/asynchronous_operation_task/${id}`, response => {
    /*
      This will reset the retryCount in case if success response is received after
      a few retries but not more than the number of retires. So if the desired error is repeated
      then the full retry will be possible.
    */
    if(retryParams) {
      retryCount=retryParams.numRetries;
    }
    const states = ['COMPLETED', 'EXCEPTION', 'KILLED', 'TIMEOUT', 'SUSPENDED', 'STOPPED', 'STALE'];
    if (states.indexOf(response.state) >= 0) {
      unloadAsyncCall();
      if (response.status.length !== 0) {
        if (response.status[0].suggestedAction !== 'FAIL') {
          dispatch({ type: SUCCESS, response });
        } else {
          dispatch({ type: FAILURE, response });
        }
      } else if(response.status.length === 0 && response.state === 'EXCEPTION') {
        /*Adding this special condition when the response has empty object of 'response.status' in case of EXCEPTION, the error needs to be displayed. Example case - HAMA Async calls */
        dispatch({ type: FAILURE, response });
      } else {
        dispatch({ type: SUCCESS, response });
      }
    }else {
      dispatch({ type: RUNNING, response });
    }
  },error=>{
    /*
      If the error status matches the error code to retry against and if retry count is 
      greater than 0 inidicating that a retry is needed then
      do not dispatch the error and instead decrement the retryCount.
    */
    if(retryCount > 0 && error.status === retryParams.errorCodeForRetry) {
      --retryCount;
    }else {
      dispatchErrorAndStopWatcher(dispatch,error, FAILURE);
    }
  });
};

export const unloadAsyncCall= function() {
  stopWatching('asyncCall');
};

export const asyncronousMultipleCall=function(dispatch, id, SUCCESS, FAILURE, RUNNING, uuid) {
  const callName = 'asyncCall_'+id;
  watchItem(callName, `/pml/asynchronous_operation_task/${id}`, response => {
    const states = ['COMPLETED', 'EXCEPTION', 'KILLED', 'TIMEOUT', 'SUSPENDED', 'STOPPED', 'STALE'];
    if (states.indexOf(response.state) >= 0) {
      unloadAsyncMultipleCall(callName);
      if (response.status.length !== 0) {
        if (response.status[0].suggestedAction !== 'FAIL') {
          dispatch({ type: SUCCESS, response, uuid });
        } else {
          dispatch({ type: FAILURE, response, uuid });
        }
      } else {
        dispatch({ type: SUCCESS, response, uuid });
      }
    }else {
      dispatch({ type: RUNNING, response, uuid });
    }
  },error=>{
    unloadAsyncMultipleCall(callName);
    dispatch({ type: FAILURE, error, uuid });
  });
};

export const unloadAsyncMultipleCall= function(callName) {
  stopWatching(callName);
};

// truncate off the https://{hostname}:port prefix of locations
export const getUrlPath=function(href) {
  let l = document.createElement("a");
  l.href = href;
  return (l ? l.pathname : '');
};

export const _getHeaders=function(directives) {
  return (directives && directives.customHeaders) ? directives.customHeaders : _headers;
};

export const _getReturnJson=function(directives) {
  return  (directives && directives.jsonResponse === false) ? false : true; // default true
};

export const toJSON=function(response) {
  if (response && response.json) {
    response = response.json();
  }
  return response;
};

export const _prefixURL=function(url, directives) {
  if (directives && !directives.preventProxy && sessionStorage.remoteSystemUUID) {
    url = `/remote/sys/${sessionStorage.remoteSystemUUID}${url}`;
  }
  return url;
};

export const _handleFetchError=function(error) {
  return Promise.reject({
    extendedError: { message: intlFormattedMessage({...messages.fetchFailure}) },
    status: 590 // HTTP 590 is our code for a failed fetch()
  });
};

export const _processStatus=function(response) {
  if (response.ok) {
    delete sessionStorage.reloaded;
    return Promise.resolve(response);
  } else {
    let sessionStorage = getWindow().sessionStorage;
    if ((sessionStorage.reloaded !== "true") && (response.status === 401) && sessionStorage.sessionID) {
     // sessionStorage.clear();
     // sessionStorage.reloaded = "true";
      //location.reload();
    }

    let contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return toJSON(response).then(jsonResponse => {
        jsonResponse.status = response.status;
        return Promise.reject(jsonResponse);
      });
    }

    return Promise.reject(response);
  }
};

export const _fetch=function(url, options, directives) {
  let returnJSON = _getReturnJson(directives);

  // prefix the URI with federation proxy if necessary
  url = _prefixURL(url, directives);

  return getWindow().fetch(url, options)
    .catch(error => _handleFetchError(error))  // catch() is first to handle fetch failures only rather than include Promise.reject() calls in then()
    .then(_processStatus)
    .then(response => returnJSON ? toJSON(response) : response);
};


let _host = '';

export default {
  get(uri, params, directives = {}) {
    const options = { method: 'GET', headers: _getHeaders(directives) };
    const query = buildQuery(params);
    return _fetch(`${_host}${uri}${query}`, options, directives);
  },

  patch(uri, dataArg, directives = {}) {
    const data = (typeof dataArg === 'object') ? JSON.stringify(dataArg) : dataArg;
    const options = { method: 'PATCH', headers: _getHeaders(directives), body: data };
    return _fetch(`${_host}${uri}`, options, directives);
  },

  post(uri, dataArg, directives = {}) {
    const data = (typeof dataArg === 'object') ? JSON.stringify(dataArg) : dataArg;
    const options = { method: 'POST', headers: _getHeaders(directives), body: data };
    return _fetch(`${_host}${uri}`, options, directives);
  },

  put(uri, dataArg, directives = {}) {
    const data = (typeof dataArg === 'object') ? JSON.stringify(dataArg) : dataArg;
    const options = { method: 'PUT', headers: _getHeaders(directives), body: data };
    return _fetch(`${_host}${uri}`, options, directives);
  },

  del(uri, directives = {}) {
    const options = { method: 'DELETE', headers: _getHeaders(directives) };
    return _fetch(`${_host}${uri}`, options, directives);
  },

  head(url, params, directives = {}) {
    const query = buildQuery(params);
    const options = { method: 'HEAD', headers: _getHeaders(directives) };
    return _fetch(`${_host}${url}${query}`, options, directives);
  }
};
