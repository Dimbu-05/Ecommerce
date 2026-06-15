import React from 'react'

const Home = () => {
  return (
    <div style={{textAlign:'center',padding:'50px'}}>
        <img  src="https://zerodha.com/static/images/landing.svg"></img>
        <center>
        <h3>Invest in everything</h3>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <button onMouseEnter={(e) => e.target.style.backgroundColor = 'darkblue'} 
        onMouseLeave={(e) => e.target.style.backgroundColor = 'blue'} 
        style={{backgroundColor:'blue',color:'white',border:'none',padding:'10px 20px',borderRadius:'5px',cursor:'pointer'}}>Sign up for free</button>
      </center>
    </div>
  )
}

export default Home
