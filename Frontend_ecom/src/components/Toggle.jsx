import React from 'react'
import { useState } from 'react'

const Toggle = () => {
    const [mode,setMode] = useState(true);
      let toggleMode=(mode)=>{
        if(mode){
          document.body.style.backgroundColor = 'black'
          document.body.style.color='white';
        }
        else{
          document.body.style.backgroundColor = 'white'
          document.body.style.color='black';
    
        }
        setMode(!mode);
      }
  return (
    <div>
        <button style={{display:'flex'}} onClick={()=>{toggleMode(mode)}}>Toggle Mode</button>
    </div>
  )
}

export default Toggle
