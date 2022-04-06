import React from "react";
import FacebookLogin from 'react-facebook-login';
const Facebooklogin = ()=>{
    const responseFacebook = (response) => {
        console.log(response);
      }
      const componentClicked = (data) => {
        console.log(data);
      }
    return(
    <FacebookLogin
    appId="950142125689838"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
    )
}
export default Facebooklogin;