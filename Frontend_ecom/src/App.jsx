import './App.css'
import Register from './components/Register';
import Toggle from './components/Toggle';
import Fetchdata from './components/Fetchdata';
const App = () => {
  return (
    <div>
      <div className="btn-grp">
        <Toggle/>
        <Fetchdata/>
      </div>
      
      <div className='form'>
        <Register/> 
      </div>
        
    </div>
  )
}

export default App
