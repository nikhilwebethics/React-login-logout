import React, {useState} from "react";
import Axios from 'axios'
import ReactGoogleLogin from "react-google-login";
const Googlelogin = ()=>{
  
    const onResponse = resp => {
        var data = resp.Du.tf;
        var mobie = 9898989898;
        var email = resp.profileObj.email;
        var passwords = resp.Du.VX;

        Axios.post("http://localhost:2002/register",{user_name:data,mobile_number:mobie,user_email:email,user_password:passwords}).then(res => {
            const registeruser = res.data;
           
          });;
       
    };
    return(
        <ReactGoogleLogin
        clientId="684491051301-f7lohc8hrub7vpa5d71adscn73i0pqsj.apps.googleusercontent.com" // We created this earlier, remember?
        buttonText="Register with google"
        onSuccess={onResponse}
        />
    );
}
export default Googlelogin;