import React, { useState } from 'react'
import './Register.css'
import {z} from 'zod'

let userschema=z.string().min(6,"username must need min 6characters").max(16,'max limit 16 characters')
let passwordchema=z.string().min(8,"username must need min 8characters").max(16,'max limit 16 characters')
let emailschema=z.email().min(3,"min charcters 3")
let roleschema=z.string().min(1,"username must need min 1characters")

function validate(schema,value){
  if(!value){
    return '';
  }
  let result = schema.safeParse(value)
  if(result.success) return ""
  return result.error.issues[0].message
}

const Register = () => {
    const [username,SetuserName] = useState('');
    const [email,Setemail] = useState('');
    const [password,SetPassword] = useState('');
    const [role,SetRole] = useState('');
    const [color, setColor] = useState("blue");

    let postDetails = async(event)=>{
      event.preventDefault();
      let response = await fetch('https://ecommerce-tbv7.onrender.com//registration',{
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
        <p>{validate(userschema,username)}</p>
        <input onChange={(e)=>{Setemail(e.target.value)}}type="email" placeholder='email'></input><br/>
        <p>{validate(passwordchema,password)}</p>
        <input onChange={(e)=>{SetPassword(e.target.value)}}type="password" placeholder='password'></input><br/>
        <p>{validate(emailschema,email)}</p>
        <input onChange={(e)=>{SetRole(e.target.value)}}type="text" placeholder='role'></input><br/>
        <p>{validate(roleschema,role)}</p>
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
