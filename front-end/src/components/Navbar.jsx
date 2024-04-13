import React from "react";
import {Link,useNavigate} from "react-router-dom";
const Navbar=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    // This will change or render the component automatically when something change in navigation
    const logout=()=>{
        localStorage.clear();
        navigate('/signup');
    }
      return (
        <div>
            
            {
                auth?
                <ul className="nav-ul nav-right">
                    {/* <img className="logo" src="../Images/logo1.png" alt="logo"></img> */}
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <Link to="/add">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/update">Update Product</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li >
                        <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
                    </li>
                </ul>
            :
            <ul className="nav-ul">
                <li>
                   {/* {auth?<Link onClick={logout}to="/logout">Logout</Link>: */}
                    <>
                       <Link to="/signup">Sign Up</Link>
                        <Link to="/Login">LogIn</Link>
                    </> 
                  
                </li>
               
            </ul>
       }
        </div>
      )
}
export default Navbar;


// Link is a URL and Route is a complete page which we want to show over the click of Link