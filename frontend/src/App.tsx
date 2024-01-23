import {Routes,Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import axios from 'axios'
import { AuthContextProvider } from './Context/AuthContext'

axios.defaults.withCredentials = true;

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
