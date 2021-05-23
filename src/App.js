import React from 'react';
import {BrowserRouter as Router, BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import Game from "./secure/Game";
import Createroom from "./secure/Createroom";
import Account from "./secure/Account";
import Homepage from "./secure/Homepage";
import Mainpage from "./secure/Mainpage";
import Gameroom from "./secure/Gameroom";

function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/account" component={Account}/>
                    <Route path="/gameroom" component={Gameroom}/>
                    <Route path="/createroom" component={Createroom}/>
                    <Route path="/homepage" component={Homepage} />
                    <Route path="/game" component={Game} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" exact component={Mainpage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
