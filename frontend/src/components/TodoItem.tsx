import axios from 'axios'
import {useState} from 'react'


type Props = {
  id: string
  title: string
  completed: boolean
}

const TodoItem = ({id,title,completed}: Props) => {

  const [edit,setEdit] = useState(false)
  const [newTitle,setNewTitle] = useState(title)
  const [isLoading,setIsLoading] = useState(false)

  const deleteItem = (id:string) => {
    setIsLoading(true)
    axios.delete('http://localhost:3000/todo/delete/'+id)
    .then(res=> console.log(res))
    .catch(err=> console.log(err))
    .finally(()=>setIsLoading(false))
    location.reload()
  }

  const editItem = (id:string,title:string) => {
    setIsLoading(true)
    setEdit(false)
    axios.put('http://localhost:3000/todo/edit/'+id, {title: title})
    .then(res=>console.log(res))
    .catch(err=> console.log(err))
    .finally(()=>setIsLoading(false))
    location.reload()
  }

  const completeItem = (id:string, completed:boolean) => {
    setIsLoading(true)
    axios.put('http://localhost:3000/todo/complete/'+id, {completed: completed})
    .then(res=>console.log(res))
    .catch(err=> console.log(err))
    .finally(()=>setIsLoading(false))
    location.reload()
  }

  return (
    <li className=" bg-gray-800 p-2 rounded flex item-center justify-between">
      
      {
        isLoading
        ?
          <h1>Item is loading...</h1>
        :
        <>
          {edit 
          ?
          <input className="bg-inherit outline-none" value={newTitle} type="text" onChange={(e)=>setNewTitle(e.target.value)}/>
          :
          <input onClick={()=>completeItem(id,completed)} className={`bg-inherit outline-none cursor-pointer ${completed && 'line-through'}`} value={title} type="text" readOnly/>
          }
          <div className="flex gap-2">
            {
              edit
              ?
              <button onClick={()=>editItem(id,newTitle)} className="text-yellow-100">Save</button>
              :
              <button onClick={()=>setEdit(true)} className="text-yellow-100">Edit</button>
            }
            <button onClick={()=>deleteItem(id)} className="text-red-700">Delete</button>
          </div>

        </>
      }
    </li>
  )
}

export default TodoItem