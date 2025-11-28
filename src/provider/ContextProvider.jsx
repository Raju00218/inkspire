import { createContext, useState } from "react";
export const Context = createContext(null)
import { useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_URL
export default function ContextProvider({children}){

  


    const[signUp, setSignUp]=useState(false)
    const showSignup=()=>{
        setSignUp( prev => !prev)
    }
        const [popupLoading, setPopupLoading] = useState(true);
    const[loginPop, setLoginPop] =useState(false)
      const setuplogin = () => {
        setPopupLoading(true)
        setLoginPop(prev => !prev)
  }
  const [user, setUser] = useState(null);
  const [userId, setUserId]=useState('')

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_BASE}/users/me`, {
          method: "GET",
          credentials: "include", // important: sends cookies
        });
        if (res.ok) {
          const data = await res.json();
          // console.log(data)
          setUser(data.user.username); // restore user state
          setUserId(data.user._id)
        }
      } catch (err) {
        console.error("Not logged in", err);
      }
    }
    fetchUser();
  }, [user]);
    return(
      <Context.Provider value={{
        signUp, showSignup, setuplogin, 
        loginPop, setLoginPop, user, setUser,userId,
        popupLoading, setPopupLoading
      }}>
        {children}
      </Context.Provider>
    )

}

