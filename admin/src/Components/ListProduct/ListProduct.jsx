import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  //logic to fetch data from backend's api

  //declaring a state variable and its calling function.initializing it with empty array.
  const [allproducts,setAllproducts]= useState([])

  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllproducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  //function to remove a product from product list
  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-type':'application/json',
        },
        body:JSON.stringify({id:id}),
  })
  await fetchInfo();
}

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
            return<> <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img src={cross_icon} alt="" className='listproduct-remove-icon' onClick={()=>{remove_product(product.id)}}/>
            </div>
            <hr />
            </>

          })}

        </div>
        
    </div>
  )
}

export default ListProduct