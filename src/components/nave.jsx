import { Routes, Route, Link } from "react-router-dom"
import { Context } from '../provider/ContextProvider'
import { useContext } from "react";

function nave() {
 const {  setuplogin }  = useContext(Context)
    const {username} = useContext(Context)
    
    const logout =async()=>{
        try{
            const res = await fetch('http://localhost:3000/users/logout',{
                method:'GET',
                credentials:'include'
            })
            const data = await res.json()
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
        <nav>
                <h2><a href="/">Inkspire</a></h2>
            <ul className="nav-ul">
                    <li><Link to='/ArticleEditer'>Post article</Link></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About Us </a></li>
                    <li>{username? <a href="#">{username}</a>:<a href="#" onClick={setuplogin} >Login</a>}</li>  
                    <li>{username ? <a href="" onClick={logout}>logout </a>:''}</li>           
            </ul>
        </nav>
        </>
    )
}
export default nave