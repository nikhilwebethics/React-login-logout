import React, {useState} from "react";
import Axios from 'axios'
import ReactGoogleLogin from "react-google-login";
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

const Googlelogin = ()=>{
    const[gmail,setgmail]=useState();
    const[password,setpassword]=useState();
    const[loginuser,setloginuser]=useState(false);

    const onResponse = resp => {
      
        var email = resp.profileObj.email;
        var passwords = resp.Du.VX;

        Axios.post("http://localhost:2002/login",{e_mail:email,user_password:passwords}).then(res => {
            const login = res.data[0].user_session_id;
             Cookies.set('user_session_id',login);
             setloginuser(true);
        });;
       
    };
    return (
        <>
        {loginuser && <Redirect to="/home" />}
        <ReactGoogleLogin
        clientId="684491051301-f7lohc8hrub7vpa5d71adscn73i0pqsj.apps.googleusercontent.com" 
        buttonText="Login with google"
        onSuccess={onResponse}

        />
        </>
    )
}
export default Googlelogin;