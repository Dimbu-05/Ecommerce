import Toggle from "./Toggle"
import { Link } from "react-router-dom"
function Header() {
  return (
    <>
      <div style={{textAlign:'center'}}>
          <header style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'20px'}}>
            <img style={{width:'200px'}}src="https://zerodha.com/static/images/logo.svg" alt="Description" />
            <input type="text" placeholder="Searcch"> Search </input>
            <nav style={{display:'flex',gap:'50px'}}>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About us</Link>
              <Link to="/registration">Sign up</Link>
              <Link to="/login">Login</Link>

              <Toggle/>
            </nav>  
          </header>
          
      </div>
      
      
      
    </>
  )
}

export default Header
