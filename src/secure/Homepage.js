import Button from '../components/Button'
import Header from '../components/Header'
import {Nav, NavDropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import React, {useEffect} from "react";

const Homepage = () => {
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/');
        }
    })

    let myItem = localStorage.getItem('user_token');
    localStorage.clear();
    localStorage.setItem('user_token',myItem);

    async function logOut(){
        let token = JSON.parse(localStorage.getItem('user_token')).data.token;
        console.warn('token', token);
        let result = await fetch("http://localhost:8000/api/logout", {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "Auth-Token": token
            }
        });
        result = await result.json();
        console.warn('result', result);
        localStorage.clear();
        history.push('login');
    }

    return(
        <div className={"container"}>
            <Nav className={"account"}>
                <NavDropdown title="User Info">
                    <NavDropdown.Item href={"/account"}>Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
            </Nav>
            <Header title={"Codenames   Online"} size={150} family={"Tulpen One"}/>
            <Button text={"Create Room"} width={200} nav='createroom'/>
            
            <div className="rule">
                <ol type={"1"} className="rules">
                    <li>How to play:</li>
                    <li>1. Click on the CREATE ROOM button.</li>
                    <li>2. Select the preferred game settings and start the game.</li> 
                    <li>3. Connect with your friends using your favorite audio or video chat.</li> 
                    <li>4. Share the room URL with your friends.</li> 
                    <li>5. Enjoy the game!</li>
                </ol>
            </div>
        </div>
    )
}

export default Homepage