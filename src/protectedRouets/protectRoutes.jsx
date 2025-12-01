import { Context } from '../provider/ContextProvider'
import { useContext } from "react";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    const { username, setLoginPop } = useContext(Context)
    setTimeout(()=>{
      if (!username) {
        setLoginPop(true)
        return <Navigate to='/' />
      }
    },300)
return children
}
