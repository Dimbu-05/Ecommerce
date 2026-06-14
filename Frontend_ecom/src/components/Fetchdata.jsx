import React, { useState } from 'react'
import Card from './Card'
const Fetchdata = () => {
    const [products,setProducts] = useState([]);
    async function FetchData() {
        const response = await fetch("http://localhost:2000/products")
        const fetchedData = await response.json();
        setProducts(fetchedData);
    }
  return (
    <div>
        <button onClick={()=>FetchData()}>click me</button>
        <div className="card">
            { products.map((p) => { return <Card key={p.id} {...p}/> }) }
        </div>
    </div>
  )
}

export default Fetchdata
