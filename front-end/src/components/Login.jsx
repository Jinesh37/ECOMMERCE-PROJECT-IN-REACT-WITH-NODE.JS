import React, { useEffect } from 'react';
import{useState} from 'react';
import{useNavigate} from "react-router-dom";
const Login=()=>{
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const navigate=useNavigate();
    // if user is slready login or we refrsh the page then it will not go on login page to avoid this we use this
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    },[])
    const handleLogin=async()=>{
        console.log(email,password);
        let result=await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-type':'application/json'
            }

        });
        result=await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate("/")
        }
        // if(result.name){
        //     localStorage.setItem("user",JSON.stringify(result));
        //     navigate("/")
        // }
    }
    return(
        <div className="login">
            <input type="text"  className="inputBox" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="text"  className="inputBox" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleLogin} className="appButton" type="button">LogIn</button>
        </div>
    )
}
export default Login