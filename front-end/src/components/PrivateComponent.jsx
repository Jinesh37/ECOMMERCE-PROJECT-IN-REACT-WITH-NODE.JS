import React from "react";
import {Navigate,Outlet} from "react-router-dom";

// outlet handle the component which we pass as a prop inside the PrivateComponent
const  PrivateComponent=()=>{
    const auth=localStorage.getItem('user');
    
    return  auth?<Outlet/>:<Navigate to="/signup" />
}
export default  PrivateComponent;