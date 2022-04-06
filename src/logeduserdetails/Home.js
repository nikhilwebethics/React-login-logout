import { useState,useEffect } from "react";
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import FileUpload from "../components/uploader/uploader";

const Home = ()=>{
    const[user,setuser]=useState();
    const currentuser = Cookies.get("user_session_id");
    const [cookies, setCookie, removeCookie] = useCookies(["user_session_id"]);
    const[login,setlogin]=useState(true);
    const[userlogout,setuserlogout]=useState(false);
    const session = Cookies.get("user_session_id");
    

    useEffect(()=>{
      Axios.post("http://localhost:2002/home",{sessionid:currentuser}).then(res => {
        const data = res.data.data[0];
        setuser(data)
      });;
    },[])
    const handleRemoveCookie = ()=> {
        removeCookie("user_session_id");
        setlogin(false)
        setuserlogout(true)

      }
  
    return( 
        <>
        <FileUpload/>
        {!session && <Redirect to="/" /> }
        {userlogout && <Redirect to="/" />}
        {user &&
        <div>
            <h1><a style={{color:'red'}}>User Name :</a>{user.user_name}</h1>
            <h2><a style={{color:'red'}}>User Mobile-Number :</a>{user.mobile_no}</h2>
           {login && <button onClick={handleRemoveCookie}>Logout</button>}
        </div>
       }
        </>
    );
}
export default Home;