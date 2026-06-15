import React, { useState } from 'react'
import Card from './Card'
const Products = () => {
    const [products,setProducts] = useState([]);
    async function FetchData() {
        const response = await fetch("http://localhost:8080/products")
        const fetchedData = await response.json();
        setProducts(fetchedData);
    }
  return (
    <div>
        <button style={{alignItems:'center'}} onClick={()=>FetchData()}>click me</button>
        <div className="card">
            { products.map((p) => { return <Card key={p.id} {...p}/> }) }
        </div>
    </div>
  )
}

export default Products
