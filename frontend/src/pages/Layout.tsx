import axios from "axios"
import { useEffect, useState, useContext } from "react"
import TodoItem from "../components/TodoItem"
import { Link } from 'react-router-dom'
import context from "../Context/AuthContext"

interface ITodo {
  _id: string
  title: string
  completed: boolean
}

const Layout = () => {

  const [title,setTitle] = useState('')
  const [todo,setTodo] = useState<ITodo[]>([])
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState('')

  console.log(error);
  

  const {isLogged,getLoggedIn} = useContext(context)

  const getItems = async () => {
    try {
      setIsLoading(true)
      const items = await axios.get('http://localhost:3000/todo/items')
      setTodo(items.data)
      setError('')
    } catch (err) {
      setError(err.response.data.errorMessage)
    } finally {
      setIsLoading(false)
    }
    
  }
  useEffect(()=> {
    getItems()
  },[isLogged])

  const createTodo = async () => {
    
    try {
      setIsLoading(true)
      await axios.post('http://localhost:3000/todo/create', {title: title})
    } catch (err) {
      console.log(err);
      
    } finally {
      setIsLoading(false)
    }
    
  }

  const logOut = async () => {
    try {
      setIsLoading(true)
      await axios.get('http://localhost:3000/auth/logout')
      getLoggedIn()
    }
    finally {
      setIsLoading(false)
    }
  }

 
  
  
  return (
    <div className="p-8 bg-slate-500 rounded flex flex-col gap-10">
      {
        isLogged
        ?
        <button onClick={logOut} className="w-full bg-gray-700 rounded p-2 text-center">Logout</button>
        :
        <Link to='/login' className="w-full bg-green-400 rounded p-2 text-center">Login</Link>
      }
      <form onSubmit={createTodo} className="w-full flex items-center">
        <input onChange={(e)=>setTitle(e.target.value)} className="p-2 text-black outline-none rounded-l w-full" type="text" />
        <button className="bg-gray-800 p-2 rounded-r">Add</button>
      </form>
      <h1 className="font-bold text-2xl">Todos:</h1>
      {error === 'Unauthorized' 
      ? 
      <h1 className="bg-red-400 rounded p-4">Login to see todos</h1> 
      : 
      <ul className="flex flex-col gap-4">
      {
        isLoading
        ?
          <h1>Loading...</h1>
        :
        todo.map(item=> {
          return <TodoItem key={item._id} getItems={getItems} id={item._id} title={item.title} completed={item.completed}/>
        })
        
      }
      </ul>
      }
      
    </div>
  )
}

export default Layout