import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';

//export const Firstpage = function()
//{
export class Firstpage extends Component  {
    render() {
        return (
            <div>
                <a className="App-link" href="Secondpage.html">Home</a> | <a className="App-link" href="Secondpage.html">Contact Us</a>

                <h2>{this.props.match.params.id}</h2>
                <h2>{this.props.match.params.name}</h2>
            </div>
        );
    }
}

//export const ShoppingList = function() {
//export function ShoppingList() {
export class ShoppingList extends React.Component {
    render() {
        let xyz;
        if (this.props.name === 'abc') {
            xyz = 'xyz';
        }

        return (
            <div className="shopping-list">
                <h2>Shopping List for {xyz}</h2>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

export class Linktext extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <a className="App-link" href="/" rel="noopener noreferrer">Click Here</a>
                </div>
                <Router>
                    <div>
                        <Link to="/Secondpage.html">Press</Link>
                        <Switch>
                            <Route exact path="/Secondpage" />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }
    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    render() {
        let header = '';
        if (this.state.username) {
            header = <h1>Hello {this.state.username}</h1>;
        } else {
            header = '';
        }
        return (
            <form>
                {header}
                <p>Enter your name:</p>
                <input type='text' onChange={this.myChangeHandler}
                />
            </form>
        );
    }
}

export class MyForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.username);
    }
    myChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h1>Hello {this.state.username}</h1>
                <p>Enter your name, and submit:</p>
                <input
                    type='text'
                    onChange={this.myChangeHandler}
                />
                <input
                    type='submit'
                />
            </form>
        );
    }
}

export class MyForm3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            age: null,
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "age") {
            if (!Number(val)) {
                alert("Your age must be a number");
            }
        }
        this.setState({ [nam]: val });
    }
    render() {
        return (
            <form>
                <h1>Hello {this.state.username} {this.state.age}</h1>
                <p>Enter your name:</p>
                <input
                    type='text'
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <p>Enter your age:</p>
                <input
                    type='text'
                    name='age'
                    onChange={this.myChangeHandler}
                />
            </form>
        );
    }
}

export class Car extends React.Component {
    constructor() {                     // The constructor function is where you initiate the component's properties.
        super();
        this.state = { color: "red" };  // Specify the state object in the constructor method:
    }
    render() {
        return <h2>I am a {this.state.color} Car!</h2>;
    }
}

class Jeep extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 1964
        };
    }
    changeColor = () => {
        this.setState({ color: "blue" });
    }
    render() {
        return (
            <div>
                <h2>I am a Jeep! , and brand {this.props.brand}</h2>
                It is a {this.state.color}
                <button type="button" onClick={this.changeColor} >Change color</button>
            </div>
        );
        //{this.props.brand.model}  //access object
    }
}

export class Garage extends React.Component {
    render() {
        const carname = "Ford";
        //const carinfo = { name: "Ford", model: "Mustang" };   // as object
        return (
            <div>
                <h1>Who lives in my Garage?</h1>
                <Jeep brand={carname} />
            </div>
        );
    }
}

export class Football extends React.Component {
    shoot = (a) => {
        alert(a);
    }
    render() {
        return (
          //<button onClick={() => this.shoot("Goal")}>Take the shot!</button>      //using Arrow Function
            <button onClick={this.shoot.bind(this, "Goal")}>Take the shot!</button> //using Regular (without Arrow) func
        );
    }
}

//ReactDOM.render(<Football />, document.getElementById('root'));
//ReactDOM.render(<MyForm />, document.getElementById('root'));
//ReactDOM.render(<MyForm2 />, document.getElementById('root'));
//ReactDOM.render(<MyForm3 />, document.getElementById('root'));
//export default Firstpage;

//give these components access to the change message creator
//export class EmplotyeeDetails extends React.Component
//{
//    getDetail = () => {
//        this.props.dispatch(getEmployeeDetail());
//        }
//    render() {
//        return {
            
//        };
//    }
//}

//export {
//    About,
//    Contact,
//}