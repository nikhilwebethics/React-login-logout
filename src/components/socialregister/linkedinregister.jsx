import React, { useState } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

const Linkedinregister = ()=>{

    const { linkedInLogin } = useLinkedIn({
        clientId: '77x3swnmrbciv1',
        redirectUri: `http://localhost:2005/Linkedinregister`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
          console.log(code);
        },
        onError: (error) => {
          console.log(error);
        },
      });

    return(
        <>
        <img
            onClick={linkedInLogin}
            src={linkedin}
            alt="Sign in with Linked In"
            style={{ maxWidth: '180px', cursor: 'pointer' }}
        />


        </>
    )
}
export default Linkedinregister;