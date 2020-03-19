import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import About from "./about";
import Login from "./RegisterLogin";
import Register from './RegisterLogin/register'
import Home from "./home/home";
import './general.css'
import AuthenticationCheck from "./nonPresentational/auth";
// import Auth from './nonPresentational/auth'

function App() {
    return (
        <div>
            <Switch>
                <Route path="/about" component={ () => <AuthenticationCheck pageToAuth={About} reload={true}/> } />
                <Route path="/login" component={ () => <AuthenticationCheck pageToAuth={Login} reload={false}/> } />
                <Route path="/register" component={ () => <AuthenticationCheck pageToAuth={Register} reload={false}/> } />
                <Route path="/"  exact component={ () => <AuthenticationCheck pageToAuth={Home} reload={false}/> } />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
