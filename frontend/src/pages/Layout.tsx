import axios from "axios"
import { useEffect, useState } from "react"
import TodoItem from "../components/TodoItem"
import { Link } from 'react-router-dom'

interface ITodo {
  _id: string
  title: string
  completed: boolean
}

const Layout = () => {

  const [title,setTitle] = useState('')
  const [todo,setTodo] = useState<ITodo[]>([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    axios.get('http://localhost:3000/todo/items')
    .then(res=> setTodo(res.data))
    .catch(err=>console.log(err))
    .finally(()=>setIsLoading(false))
  },[])

  const createTodo = () => {
    setIsLoading(true)
    axios.post('http://localhost:3000/todo/create', {title: title})
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
    .finally(()=>setIsLoading(false))
  }

  
  return (
    <div className="p-8 bg-slate-500 rounded flex flex-col gap-10">
      <Link to='/login' className="w-full bg-green-400 rounded p-2 text-center">Login</Link>
      <form onSubmit={createTodo} className="w-full flex items-center">
        <input onChange={(e)=>setTitle(e.target.value)} className="p-2 text-black outline-none rounded-l w-full" type="text" />
        <button className="bg-gray-800 p-2 rounded-r">Add</button>
      </form>
      <h1 className="font-bold text-2xl">Todos:</h1>
      <ul className="flex flex-col gap-4">
      {
        isLoading
        ?
          <h1>Loading...</h1>
        :
        todo.map(item=> {
          return <TodoItem key={item._id} id={item._id} title={item.title} completed={item.completed}/>
        })
      }
      </ul>
    </div>
  )
}

export default Layout