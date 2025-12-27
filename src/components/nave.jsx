import { Routes, Route, Link } from "react-router-dom"
import { Context } from '../provider/ContextProvider'
import { useContext } from "react";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL
function nave() {
 const {  setuplogin }  = useContext(Context)
    const {username,setUserName}= useContext(Context)
    const { setLogoutLoading } = useContext(Context)
    const {openMenu, isMenuOpen} =useContext(Context)
    const logout =async()=>{
        setLogoutLoading(true)
        try{
            const res = await fetch(`${API_BASE}/users/logout`,{
                method:'POST',
                credentials:'include'
            })
            const data = await res.json()
            if (res.ok) {
                 setUserName('');
                 setLogoutLoading(false)  
            }
        }catch(err){
            console.log(err)
    
        }
    }

    return(
        <>
        <nav>
                <h2><a href="/">Inkspire</a></h2>
                <ul className={`nav-ul ${openMenu ? "open" :""}`}>
                    <li><Link to='/article_editor'>Post article</Link></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About Us </a></li>
                    <li>{username ? (<a href="#">{username}</a>) : (<a href="#" onClick={setuplogin} >Login</a>)}</li>  
                    <li>{username ? (<a href="#" onClick={logout}>logout </a>):('')}</li>           
            </ul>
            <div className="menubar" onClick={isMenuOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 640 640" width={"30px"} height={"30px"}>
                    <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" /></svg>
            </div>
        </nav>
        </>
    )
}
export default nave
