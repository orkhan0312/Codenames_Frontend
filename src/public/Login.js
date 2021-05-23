import React, {useState} from "react";
import Button from '../components/Button'
import Header from '../components/Header'
import './public.css'
import {useHistory} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function signIn(){
        let item = {email, password}
        console.warn("item", item);
        let result = await fetch("http://localhost:8000/api/login",{
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type" : 'application/json',
                "Accept" : 'application/json'
            }
        });
        result = await result.json();
        if(result['data'] != null){
            localStorage.setItem("token", JSON.stringify(result));
            history.push('/homepage');
        }
    }

        return (
            <div className="col-sm-6 offset-sm-3">
                <Header title=" Log in" size={75} family={'Thasadith'} />
                <div>
                    <label className="text-secondary">Username</label>
                    <br/>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control-sm" placeholder="john@ufaz.az"/>
                </div>
                <br/>
                <div>
                    <label className="text-secondary">Password</label>
                    <br/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control-sm" placeholder="Enter password"/>
                </div>
                <br/>
                <button onClick={signIn} className='btn' style={{width:250}}>Log in</button>
            </div>
    )
}

export default Login;

