import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from "./about";
import Login from "./RegisterLogin";
import Register from './RegisterLogin/register'
import Home from "./home/home";
import Redirect from "react-router-dom/es/Redirect";
import './general.css'


function App() {
  return (
    <div>
        <Switch>
            <Route path="/about" component={ About } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/"  exact component={ Home } />
            <Redirect to="/" />
        </Switch>
    </div>
  );
}

export default App;
