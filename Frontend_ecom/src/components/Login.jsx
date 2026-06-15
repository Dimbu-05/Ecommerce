import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    let sendDetails = async(event)=>{
        event.preventDefault();
        let jwttoken = localStorage.getItem('token')
        let response = await fetch('http://localhost:8080/login',{
        method:'post',
        headers:{
          "Content-type":"application/json",
          authorization :`Bearer ${jwttoken}`
        },
        body:JSON.stringify({username,password})
        })
        let data = await response.json();
        alert(data.msg);
    }
  return (
    <div>
      <section style={{textAlign:'center'}}>
        <h1> Login in to your account</h1>
        <form className='register-form' onSubmit={sendDetails  }>
            <input onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='username'></input><br/>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password'></input><br/>
            <button type='submit'>Login</button>
        </form>
      </section>
    </div>
  )
}

export default Login
