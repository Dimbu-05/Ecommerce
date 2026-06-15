import Toggle from "./Toggle"
import { Link } from "react-router-dom"
function Header() {
  return (
    <>
      <div style={{textAlign:'center'}}>
          <header style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'20px'}}>
            <img style={{width:'200px'}}src="https://zerodha.com/static/images/logo.svg" alt="Description" />
            <nav style={{display:'flex',gap:'50px'}}>
              <Link to='/registration'><a href="#">Sign up</a></Link>
              <Link to='/products'><a href="#">Products</a></Link>
              <Link to='/about'><a href="#">About us</a></Link>
             
            </nav>  
          </header>
          <Toggle/>
      </div>
      
      
      <center>
        <h3>Invest in everything</h3>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <button onMouseEnter={(e) => e.target.style.backgroundColor = 'darkblue'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'blue'} 
        style={{backgroundColor:'blue',color:'white',border:'none',padding:'10px 20px',borderRadius:'5px',cursor:'pointer'}}>Sign up for free</button>
      </center>
    </>
  )
}

export default Header
