import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

function ChangePassword(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('user_token')){
            history.push('/');
        }
    })

    async function Change(){
        let token = JSON.parse(localStorage.getItem('token')).data.token;
        let item = {oldPassword, newPassword, confPass}
        console.warn('item', item);
        let result = await fetch("http://localhost:8000/api/changePassword", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json',
                "Auth-Token": token
            }
        });
        result = await result.json();
        console.warn('result', result);
        if(result.data) {
            localStorage.clear();
            history.push('login');
        }
    }
    return (
        <div className="col-sm-6 offset-sm-3">
            <Header title="Change Password" size={75} family={'Thasadith'} />

            <div>
                <label className="text-secondary">Current Password</label>
                <br/>
                <input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="form-control-sm" placeholder="Enter password"/>
            </div>
            <br/>
            <div>
                <label className="text-secondary">New Password</label>
                <br/>
                <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control-sm" placeholder="Enter password"/>
            </div>
            <br/>
            <div>
                <label className="text-secondary">Confirm Password</label>
                <br/>
                <input type="password" value={confPass} onChange={(e)=>setConfPass(e.target.value)} className="form-control-sm" placeholder="Confirm password"/>
            </div>

            <br/>
            <button onClick={Change} className='btn' style={{width:250}}>Submit</button>
            {/*<hr/>
                    <Button text='Redirect to Login page' width={250} nav="/login" />*/}
        </div>

    )
}
export default ChangePassword