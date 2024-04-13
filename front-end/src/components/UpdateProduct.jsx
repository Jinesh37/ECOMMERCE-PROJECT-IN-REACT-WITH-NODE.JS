import React from 'react';
import {useState,useEffect} from "react";
import{useParams,useNavigate} from 'react-router-dom';
const UpdateProduct=()=>{
    const[name,setName]=useState();
    const[price,setPrice]=useState();
    const[category,setCategory]=useState();
    const[company,setCompany]=useState();
   const params=useParams();
   const navigate=useNavigate();
   useEffect(()=>{
     console.warn(params);
     getProductDetails();
   },[])

    const getProductDetails=async()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateProduct=async()=>{
    let result=await fetch(`http://localhost:5000/product/${params.id}`,
    {
        method:'Put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }

});
result=await result.json();
console.warn(result);
navigate("/");
   }

    return (
        <div className="product">
            <h1>update Product</h1>
            <input type="text" value={name} className="inputBox" placeholder="Enter product name" onChange={(e)=>setName(e.target.value)}></input>
            <input type="text" value={price} className="inputBox" placeholder='Enter  product price' onChange={(e)=>setPrice(e.target.value)}></input>
            <input type="text" value={category}  className="inputBox" placeholder="Enter product category" onChange={(e)=>setCategory(e.target.value)}></input>
            <input type="text" value={company} className="inputBox" placeholder="Enter product company" onChange={(e)=>setCompany(e.target.value)}></input>
            <button onClick={updateProduct} className="addButton">Update Product</button>
        </div>
    )
}
export default UpdateProduct;