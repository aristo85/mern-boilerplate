import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "./RegisterLogin";
import Register from './RegisterLogin/register'
import Home from "./home/home";
import './general.css';
import About from "./about/index";
import AuthenticationCheck from "./nonPresentational/auth";
import 'bootstrap/dist/css/bootstrap.css';
import NavbarMenu from "./navbar";

function App() {
    return (
        <div>
            <NavbarMenu />
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
