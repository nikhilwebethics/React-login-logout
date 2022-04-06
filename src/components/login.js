import { useState } from "react";
import Axios from 'axios';
import './regisform.css';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import Googlelogin from "./sociallogin/googlelogin";

const Login = ()=>{
    const[mobileno,setmobileno]=useState();
    const[password,setpassword]=useState();
    const[loginuser,setloginuser]=useState(false);

    const formhandle = resp =>{
        resp.preventDefault();
        if(mobileno || password){
            Axios.post("http://localhost:2002/login",{e_mail:mobileno,user_password:password}).then(res => {
                const login = res.data[0].user_session_id;
                Cookies.set('user_session_id',login)
                setloginuser(true)
            });;
        }
    }
    const login = Cookies.get("user_session_id");
   
 
    return (
        
        <section>
            {loginuser && <Redirect to="/home" />}
            {login && <Redirect to="/home" />}
            <h1>Login Form</h1>
            <form onSubmit={formhandle}>
                <label>
                    Mobile No:
                    <input type="text" name="name" onChange={(e)=> setmobileno(e.target.value) }/>
                </label><br/>
                <label>
                    Password:
                    <input type="text" name="name" onChange={(e)=> setpassword(e.target.value)} />
                </label><br/>
                <input type="submit" value="Submit" />
                <Googlelogin />
            </form>
        </section>
    )
}
export default Login;