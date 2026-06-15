import './App.css'
import Register from './components/Register';
import Header from './components/Header';
import About from './components/About';
import Toggle from './components/Toggle';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products'
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
  <>
    <section style={{textAlign:'center'}}>
      <Header/>
    </section>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/registration'element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  </>
  )
}

export default App
