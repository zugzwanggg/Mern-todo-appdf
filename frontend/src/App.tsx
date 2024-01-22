import {Routes,Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  )
}

export default App
