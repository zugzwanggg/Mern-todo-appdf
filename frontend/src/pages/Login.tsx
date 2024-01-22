import { Link } from "react-router-dom"

type Props = {}

const Login = (props: Props) => {
  return (
    <form className="bg-slate-500 p-4 w-96 flex flex-col gap-4 rounded text-gray-900">
      <h1 className="font-bold text-xl text-white">Login</h1>
      <input className="p-2 rounded" type="email" placeholder="Your email" />
      <input className="p-2 rounded" type="password" placeholder="Your password"/>
      <button className="bg-gray-800 p-2 rounded text-white">Login</button>
      <p className="text-white font-semibold mt-4">Don't have an account? <Link to='/signup' className="underline text-green-300">Sign Up</Link></p>
    </form>
  )
}

export default Login