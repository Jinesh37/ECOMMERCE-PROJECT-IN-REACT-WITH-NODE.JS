import React from "react";
import { useState } from "react";
const AddProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);
  const addProduct = async () => {
    console.log(name, price, company, category);

    if (!name || !price || !category || !company) {
        setError(true);
      return false;

    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://loclahost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.warn(result);
    //   response.send(result);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        value={name}
        className="inputBox"
        placeholder="Enter product name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      {error && !name && <span className="invalid-input">Enter Valid Name</span>}
      <input
        type="text"
        value={price}
        className="inputBox"
        placeholder="Enter  product price"
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      {error&& !price && <span className="invalid-input">Enter Valid Product price</span>}
      <input
        type="text"
        value={category}
        className="inputBox"
        placeholder="Enter product category"
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      {error && !category && <span className="invalid-input">Enter Valid Product Category</span>}
      <input
        type="text"
        value={company}
        className="inputBox"
        placeholder="Enter product company"
        onChange={(e) => setCompany(e.target.value)}
      ></input>
      {error && !company && <span className="invalid-input">Enter Valid company name</span>}
      <button onClick={addProduct} className="addButton">
        Add Product
      </button>
    </div>
  );
};
export default AddProduct;
