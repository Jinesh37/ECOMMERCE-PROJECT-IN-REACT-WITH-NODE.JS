import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList"
import PrivateComponent from "./components/PrivateComponent"
import UpdateProduct from "./components/UpdateProduct";
//

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          < Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList/>}/>
            {/* <Route path="/add" element={<h1>Add Product Component</h1>}/> */}
            <Route path="/update/:id" element={<UpdateProduct/>}/>
            <Route path="/add" element={<AddProduct />}/>
            <Route path="/logout" element={<h1>Logout component</h1>}/>
            <Route path="/profile" element={<h1>Profile component</h1>}/>
          </Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<Navbar/>
//   }
// ])
