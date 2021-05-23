import React, {useState} from 'react'
import Header from '../components/Header'
import {Redirect, useHistory} from 'react-router-dom'
import './public.css'

function Register(){
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const history = useHistory();

    async function signUp(){
        if(password !== confPass) {

        } else {
            let item = {name, surname, email, nickname, password}
            console.warn("item", item);
            let result = await fetch("http://localhost:8000/api/users", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            result = await result.json();
            if(result['data'] != null) {
                localStorage.setItem("user-info", JSON.stringify(result));
                history.push('/login');
            }
        }
    }

    return (
            <div className="col-sm-6 offset-sm-3">
                    <Header title="Sign up" size={75} family={'Thasadith'} />

                        <div>
                            <label className="text-secondary">First Name</label>
                            <br/>
                            <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control-sm" placeholder="John"/>
                        </div>
                        <br/>
                        <div>
                            <label className="text-secondary">Last Name</label>
                            <br/>
                            <input type="text" value={surname} onChange={(e)=>setSurname(e.target.value)} className="form-control-sm" placeholder="Doe"/>
                        </div>
                        <br/>
                        <div>
                            <label className="text-secondary">User Name</label>
                            <br/>
                            <input type="text" value={nickname} onChange={(e)=>setNickname(e.target.value)} className="form-control-sm" placeholder="john.doe"/>
                        </div>
                        <br/>
                        <div>
                            <label className="text-secondary">Email</label>
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
                        <div>
                            <label className="text-secondary">Confirm Password</label>
                            <br/>
                            <input type="password" value={confPass} onChange={(e)=>setConfPass(e.target.value)} className="form-control-sm" placeholder="Confirm password"/>
                        </div>

                    <br/>
                    <button onClick={signUp} className='btn' style={{width:250}}>Sign up</button>
                    {/*<hr/>
                    <Button text='Redirect to Login page' width={250} nav="/login" />*/}
            </div>

        )
}

export default Register;