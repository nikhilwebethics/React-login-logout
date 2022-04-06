import React, {useState,useEffect} from "react";
import Axios from 'axios'
import './regisform.css';
import { Link } from "react-router-dom";
import Googlelogin from "./socialregister/googleregister";
import Facebooklogin from "./socialregister/facebooklogin";
import Twitter from "./socialregister/Twitterlogin";


const Registerform = ()=>{

    const[name,setName]=useState();
    const[mobileno,setMobileno]=useState();
    const[gmail,setgmail]=useState();
    const[password,setpassword]=useState();
    const[text,settext]=useState();

    const formhandle = (event)=>{
        event.preventDefault();
        Axios.post("http://localhost:2002/register",{user_name:name,mobile_number:mobileno,user_email:gmail,user_password:password}).then(res => {
            const registeruser = res.data;
            console.log(registeruser)
          });;
        setName(null);
        setMobileno(null);
        setgmail(null);
        setpassword(null);
    }


    const formdelete = (event)=>{
        event.preventDefault();
        Axios.delete("http://localhost:2002/delete",{user_name:text});
 
    }


    
    return(
        <>
        <section>
            <h1>Register Form</h1>
            <form onSubmit={formhandle}>
                <label> 
                    Name:
                    <input type="text" name="name" onChange={(e)=> setName(e.target.value)} />
                </label><br/>
                <label>
                    Mobile-no:
                    <input type="number" name="name" onChange={(e)=> setMobileno(e.target.value)} />
                </label><br/>
                <label>
                    G-mail:
                    <input type="email" name="name" onChange={(e)=> setgmail(e.target.value)} />
                </label><br/>
                <label>
                    Password:
                    <input type="password" name="name" onChange={(e)=> setpassword(e.target.value)} />
                </label><br/>

                <input type="submit" value="Submit" />
            </form>
            <div>
                <Googlelogin />
                <Facebooklogin />
                <Twitter />
                
            </div>
        </section>

        <Link to={`/login`} className="active" style={{color:'white'}}>Click to  Login</Link>
   
        </>

    )
}
export default Registerform;