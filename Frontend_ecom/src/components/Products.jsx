import React, { useState } from 'react'
import Card from './Card'
const Products = ({searchQuery}) => {
    const [products,setProducts] = useState([]);
    async function FetchData() {
        const response = await fetch("https://ecommerce-tbv7.onrender.com/products")
        const fetchedData = await response.json();
        setProducts(fetchedData);
    }
    let filteredproducts = products.filter((p=>{
        return p.title.toLowerCase().includes(searchQuery.toLowerCase())
    }))
  return (
    <div>
        <button style={{alignItems:'center'}} onClick={()=>FetchData()}>click me</button>
        <div className="card">
            { filteredproducts.map((p) => { return <Card key={p.id} {...p}/> }) }
        </div>
    </div>
  )
}

export default Products
