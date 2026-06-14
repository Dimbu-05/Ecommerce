import React, { useState } from 'react'
import './Register.css'
const Register = () => {
    const [username,SetuserName] = useState('');
    const [email,Setemail] = useState('');
    const [password,SetPassword] = useState('');
    const [role,SetRole] = useState('');
    const [color, setColor] = useState("blue");

  return (
    <div>
      <form className='register-form'>
        <input onChange={(e)=>{SetuserName(e.target.value)}} type="text" placeholder='username'></input><br/>
        <input onChange={(e)=>{Setemail(e.target.value)}}type="email" placeholder='email'></input><br/>
        <input onChange={(e)=>{SetPassword(e.target.value)}}type="password" placeholder='password'></input><br/>
        <input onChange={(e)=>{SetRole(e.target.value)}}type="text" placeholder='role'></input><br/>
        <button 
          style={{backgroundColor:color,color:'white'}}
          onMouseEnter={()=>setColor('green')}
          onMouseLeave={()=>setColor('blue')}
        >Submit</button>
      </form>
    </div>
  )
}

export default Register
