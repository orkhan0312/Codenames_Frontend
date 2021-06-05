import React from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import Game from "./secure/Game";
import Createroom from "./secure/Createroom";
import Account from "./secure/Account";
import Homepage from "./secure/Homepage";
import Mainpage from "./public/Mainpage";
import ChangePassword from "./secure/ChangePassword";

function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/account" component={Account}/>
                    <Route path="/createroom" component={Createroom}/>
                    <Route path="/homepage" component={Homepage} />
                    <Route path="/game/:id" component={Game} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" exact component={Mainpage} />
                    <Route path="/changePassword" exact component={ChangePassword} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
