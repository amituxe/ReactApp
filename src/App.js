import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Firstpage, ShoppingList, Linktext, MyForm, MyForm2, MyForm3, Car, Garage, Football } from './pages/Firstpage';
import { PersonList } from './Actions/Action';
import ToDoApp from './Components/App.jsx'

function App() {
        return (
            <div className="App">
                <header className="App-header">
                    <Router>
                        <ul role="nav" className="menustyle">
                            <li><Link to="/MyForm">MyForm</Link></li>
                            <li><Link to="/MyForm2">MyForm2</Link></li>
                            <li><Link to="/MyForm3">MyForm3</Link></li>
                            <li><Link to="/Linktext">Linktext</Link></li>
                            <li><Link to="/ShoppingList">ShoppingList</Link></li>
                            <li><Link to="/Firstpage">Firstpage</Link></li>
                            <li><Link to="/PersonList">API</Link></li>
                            <li><Link to="/ToDoApp">Redux</Link></li>
                            <li><Link to="/Car">Constructor & State</Link></li>
                            <li><Link to="/Football">React Events</Link></li>
                            <li><Link to="/Garage">Inheritance & State</Link></li>
                        </ul>
                        <div>
                            <Route path='/MyForm' component={MyForm} />
                            <Route path='/MyForm2' component={MyForm2} />
                            <Route path='/MyForm3' component={MyForm3} />
                            <Route path='/Linktext' component={Linktext} />
                            <Route path='/ShoppingList' component={ShoppingList} />
                            <Route path='/Firstpage/:id/:name' component={Firstpage} />
                            <Route path='/PersonList' component={PersonList} />
                            <Route path='/ToDoApp' component={ToDoApp} />
                            <Route path='/Car' component={Car} />
                            <Route path='/Football' component={Football} />
                            <Route path='/Garage' component={Garage} />
                        </div>
                    </Router>
                </header>
                <div id="root"></div>
            </div>
        );
}

export default App;