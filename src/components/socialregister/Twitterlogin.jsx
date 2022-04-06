import React from "react";
import ReactTwitterLogin from "react-twitter-login";
const Twitter = ()=>{
    const authHandler = (error, data) => {
        if (error) return console.error(error);
        console.log(data);
      };
    return(
        <ReactTwitterLogin
        authCallback={authHandler}
        buttonText="Register with twitter"
        consumerKey="8776326" // We created this, remember?
        consumerSecret="8776326" // We created this, remember?
        callbackUrl="8776326" // You set this up in the twitter app settings, remember?
      />
    )
}
export default Twitter;