import { Link } from "react-router-dom"
import {useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import context from "../Context/AuthContext";



const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {getLoggedIn} = useContext(context)

  const navigate = useNavigate()

  const login = async () => {
   
    try {
      navigate('/')
      await axios.post('http://localhost:3000/auth/login', {email,password})
      getLoggedIn()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={login} className="bg-slate-500 p-4 w-96 flex flex-col gap-4 rounded text-gray-900">
      <h1 className="font-bold text-xl text-white">Login</h1>
      <input onChange={e=>setEmail(e.target.value)} className="p-2 rounded" type="email" placeholder="Your email" />
      <input onChange={e=>setPassword(e.target.value)} className="p-2 rounded" type="password" placeholder="Your password"/>
      <button className="bg-gray-800 p-2 rounded text-white">Login</button>
      <p className="text-white font-semibold mt-4">Don't have an account? <Link to='/signup' className="underline text-green-300">Sign Up</Link></p>
    </form>
  )
}

export default Login