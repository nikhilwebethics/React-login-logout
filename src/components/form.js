import React, {useState,useEffect} from "react";
import Axios from 'axios'
const Form = ()=>{
    const[name,setName]=useState();
    const[school,setSchool]=useState();

    const[namealert,setnamealert] = useState(false);
    const formhandle = (e)=>{
        e.preventDefault();
        if(!name){
            setnamealert(true) 
        }
        Axios.post("http://localhost:2002/api",{user_name:name,school:school});
        setName('');
        setSchool()

    }
    useEffect(() => {
        Axios.get("http://localhost:2002/getapi").then(res => {
            const persons = res.data;
            console.log(persons)
          });
      },[]);
    
    return(
        <>
        
        <form onSubmit={formhandle}>
            <label> {namealert && <h1>fill the name</h1>}
                Name:
                <input type="text" name="name" onChange={(e)=> setName(e.target.value) }/>
            </label><br/>
            <label>
                School:
                <input type="text" name="name" onChange={(e)=> setSchool(e.target.value)} />
            </label><br/>
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}
export default Form;