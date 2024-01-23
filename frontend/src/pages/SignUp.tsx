import { Link } from "react-router-dom"
import axios from "axios"
import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import context from "../Context/AuthContext"




const SignUp = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const {getLoggedIn} = useContext(context)

  const signUp = async () => {
    try {
      navigate('/')
      await axios.post('http://localhost:3000/auth/signup', {email,password,passwordVerify: confirmPassword})
      getLoggedIn()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form onSubmit={signUp} className="bg-slate-500 p-4 w-96 flex flex-col gap-4 rounded text-gray-900">
      <h1 className="font-bold text-xl text-white">Sign Up</h1>
      <input onChange={(e)=>setEmail(e.target.value)} className="p-2 rounded" type="email" placeholder="Your email" />
      <input onChange={(e)=>setPassword(e.target.value)} className="p-2 rounded" type="password" placeholder="Your password"/>
      <input onChange={(e)=>setConfirmPassword(e.target.value)} className="p-2 rounded" type="password" placeholder="Confirm your password"/>
      <button className="bg-gray-800 p-2 rounded text-white">Sign Up</button>
      <p className="text-white font-semibold mt-4">Already have an account? <Link to='/login' className="underline text-green-300">Login</Link></p>
    </form>
  )
}

export default SignUp