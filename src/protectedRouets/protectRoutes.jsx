import { Context } from '../provider/ContextProvider'
import { useContext } from "react";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    const { username, setLoginPop } = useContext(Context)

    if(!username){
        console.log(username)
      setLoginPop(true)
      return <Navigate to ='/'/>

    }
return children
}
