import { createContext, useState } from "react";
export const Context = createContext(null)
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
const API_BASE = import.meta.env.VITE_API_URL
export default function ContextProvider({children}){
  const isMobile =useMediaQuery({minWidth:481})
  const [openMenu, setOpenMenu] = useState(false)
  function isMenuOpen() {
    setOpenMenu(isOpenMenu => !isOpenMenu)
  }
  useEffect(()=>{
    if (isMobile) {
      setOpenMenu(false)
    }

  },[isMobile])
 const [logoutLoading, setLogoutLoading] = useState(false);


    const[signUp, setSignUp]=useState(false)
    const showSignup=()=>{
        setSignUp( prev => !prev)
    }
        const [popupLoading, setPopupLoading] = useState(true);
    const[loginPop, setLoginPop] =useState(false)
      const setuplogin = () => {
        setPopupLoading(true)
        setLoginPop(prev => !prev)
        setOpenMenu(false)
  }
  const [username, setUserName] = useState('');
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
          if (data && data.user && data.user.username) {
            setUserName(data.user.username);
            setUserId(data.user.id)
          }
        }
      } catch (err) {
        console.error("Not logged in", err);
      }
    }
    fetchUser();
  }, [username]);
    return(
      <Context.Provider value={{
        signUp, showSignup, setuplogin, setSignUp,
        loginPop, setLoginPop, username, setUserName,userId,
        popupLoading, setPopupLoading, setLogoutLoading, logoutLoading,
        setOpenMenu, openMenu, isMenuOpen
      }}>
        {children}
      </Context.Provider>
    )

}

