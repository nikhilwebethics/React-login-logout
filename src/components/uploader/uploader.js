import { useState,useEffect } from "react";
import Axios from 'axios';

const FileUpload = ()=>{


    const onImageChange = (event)=>{
        event.preventDefault();
        const image = event.target.files
        console.log(image)
        Axios.post("http://localhost:2002/upload",{user_img:image}).then(res => {
        const data = res.data;

      });;

    }
    return(
    <>
    <input type="file" multiple accept="image/*" onChange={onImageChange} />
    </>
  
    )
}
export default FileUpload;