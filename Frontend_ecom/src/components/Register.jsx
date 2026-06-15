import React, { useState } from 'react'
import './Register.css'
const Register = () => {
    const [username,SetuserName] = useState('');
    const [email,Setemail] = useState('');
    const [password,SetPassword] = useState('');
    const [role,SetRole] = useState('');
    const [color, setColor] = useState("blue");

    let postDetails = async(event)=>{
      event.preventDefault();
      let response = await fetch('http://localhost:8080/registration',{
        method:'post',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({username,email,password,role})
      })
      let data = await response.json();
      let token = data.token;
      localStorage.setItem("token",token)
      alert(data.msg)  
    }

  return (
    <div>
      <form className='register-form' onSubmit={postDetails}>
        <input onChange={(e)=>{SetuserName(e.target.value)}} type="text" placeholder='username'></input><br/>
        <input onChange={(e)=>{Setemail(e.target.value)}}type="email" placeholder='email'></input><br/>
        <input onChange={(e)=>{SetPassword(e.target.value)}}type="password" placeholder='password'></input><br/>
        <input onChange={(e)=>{SetRole(e.target.value)}}type="text" placeholder='role'></input><br/>
        <button 
          style={{backgroundColor:color,color:'white'}}
          onMouseEnter={()=>setColor('green')}
          onMouseLeave={()=>setColor('blue')}
        >Sign Up</button>
      </form>
    </div>
  )
}

export default Register
