import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Purchases from './pages/Purchases'
import Cart from './pages/Cart'
import ProtectedUserLogged from './components/App/ProtectedUserLogged'
import Navbar from './components/Layout/Navbar'
import { useEffect } from 'react'
import { getAllCartProducts } from './store/slices/cart.slice'
import { useDispatch } from 'react-redux'
import Notification from './components/App/Notification'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCartProducts())
  }, [])

  return (
    <div className="App">
     <Navbar/>
     <Notification/>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<ProtectedUserLogged />}>
          <Route path="purchases" element={<Purchases />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
     </Routes> 
    </div>
  )
}

export default App
