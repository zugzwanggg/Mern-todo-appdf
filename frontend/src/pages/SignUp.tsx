import { Link } from "react-router-dom"

type Props = {}

const SignUp = (props: Props) => {
  return (
    <form className="bg-slate-500 p-4 w-96 flex flex-col gap-4 rounded text-gray-900">
      <h1 className="font-bold text-xl text-white">Sign Up</h1>
      <input className="p-2 rounded" type="text" placeholder="Your name" />
      <input className="p-2 rounded" type="email" placeholder="Your email" />
      <input className="p-2 rounded" type="password" placeholder="Your password"/>
      <button className="bg-gray-800 p-2 rounded text-white">Sign Up</button>
      <p className="text-white font-semibold mt-4">Already have an account? <Link to='/login' className="underline text-green-300">Login</Link></p>
    </form>
  )
}

export default SignUp