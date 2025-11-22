import React, { useState } from 'react';
import { Context } from '../provider/ContextProvider'
import { useContext } from "react";
const API_BASE = import.meta.env.VITE_API_URL
import Loader from '../components/loder'
export default function Signup() {
    const[nameErr, setNameErr]=useState()
    const [emailErr, setEmailErr] = useState()
    const [passwordErr, setPasswordErr] = useState()
    const {  showSignup }  = useContext(Context)
    const {  setuplogin } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const createUser=async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        setNameErr('')
        setEmailErr ('')
        setPasswordErr('')
        setLoading(true)
        try{
            const res = await fetch(`${API_BASE}/users`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body :JSON.stringify({username,email,password})
            })
            const reqRes = await res.json()
            if(res.ok){
                e.target.reset()
                setNameErr('')
                setEmailErr('')
                setPasswordErr('')
                setTimeout(() => {
                    setLoading(false);
                    setSignUp(false)
                }, 1000);
            }
            if(reqRes.errors){
              setNameErr( reqRes.errors.username)
              setEmailErr  (reqRes.errors.email)
               setPasswordErr( reqRes.errors.password)
            }
        }catch(error){
            console.log(error)
        }
    }


    
    return (
     <>
         <div className='pop-up'>
                <div className="form-container">
                    <div className="remove-loginPop">
                        <button className="remove-loginPop" onClick={setuplogin}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg>
                        </button>
                    </div>
                    <form onSubmit={createUser} className='login-form'>
                        <h2>Sign Up</h2>
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                        />
                        <div className="username-err">{nameErr}</div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Cooper234@gmail.com"

                            required
                        />
                        <div className="email-err">{emailErr}</div>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                        <div className="email-err">{passwordErr}</div>
                        <button type="submit">Sign Up</button>
                        <p>Already have an account?<a href="#" onClick={showSignup}>login</a></p>
                    </form>
                </div>
            </div>
            {loading && <Loader />}
     
     </>
    );
}