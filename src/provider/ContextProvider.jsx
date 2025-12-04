import { createContext, useState } from "react";
import { use } from "react";
export const Context = createContext(null)
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const API_BASE = import.meta.env.VITE_API_URL

export default function ContextProvider({children}){
  const [currPage, setCurrPage] = useState() // curr page number for next and back
  const [pageNumber, setPageNumber] = useState() //setting navigation pages numbers

  // Returns true if viewport width is <= 480px (mobile screens) dynamic css
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

// signup page mounting
    const[signUp, setSignUp]=useState(false)
    const showSignup=()=>{
        setSignUp( prev => !prev)
    }
    // login page loading 
        const [popupLoading, setPopupLoading] = useState(true);
        // login page popup tracking
         const[loginPop, setLoginPop] =useState(false)
      const setuplogin = () => {
        setPopupLoading(true)
        setLoginPop(prev => !prev)
        setOpenMenu(false)
  }
  // dynamic user name showing 
  const [username, setUserName] = useState('');
  //  sending user id for post article creation along with article
  const [userId, setUserId]=useState('')
 
  // checking  user user loged or not 
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
        setOpenMenu, openMenu, isMenuOpen, setCurrPage, currPage,setPageNumber,
        pageNumber
      }}>
        {children}
      </Context.Provider>
    )

}

