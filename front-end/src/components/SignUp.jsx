import React from 'react';
import {useState,useEffect} from "react";
import{useNavigate} from "react-router-dom"
const SignUp=()=>{
    const [name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
          navigate("/")
        }
    })
    const collectData=async (e)=>{
        let result=await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'content-type':'application/json'
            },
        })
        result=await result.json()
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result){
             navigate("/")
        }
        
    }
      return(
        <div className="mainInput">
            <h1>Register</h1>
            <input className="inputBox" value={name} type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"></input>
            <input className="inputBox" value={email} type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"></input>
            <input className="inputBox" value={password} type='password' onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"></input>
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
      )
}
export default SignUp;