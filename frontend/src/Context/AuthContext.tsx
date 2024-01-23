import axios from 'axios'
import {useState,useEffect,createContext} from 'react'
import { RouteProps } from 'react-router-dom'

const defaultValue = {
  isLogged: undefined,
  getLoggedIn: Function.prototype,
}

const context = createContext(defaultValue)

const AuthContextProvider = (props:RouteProps) => {

  const [isLogged,setIsLogged] = useState(undefined)

  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get('http://localhost:3000/auth/loggedIn')

      setIsLogged(loggedInRes.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getLoggedIn()
  }, [])

  return (
    <context.Provider value={{isLogged,getLoggedIn}}>
      {props.children}
    </context.Provider>
  )
}

export default context
export {AuthContextProvider}