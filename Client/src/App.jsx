import { Routes, Route } from "react-router-dom";
import './App.css'
import Index from './Pages/Index';
import axios from 'axios';



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Index/>} />
      </Routes>

    </>
  )
}

export default App
