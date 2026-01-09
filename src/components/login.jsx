import React, { useEffect, useState } from "react";
import SignUp from './signup'
import {Context} from '../provider/ContextProvider'
import { useContext } from "react";
import Loader from '../components/loder'

const API_BASE = import.meta.env.VITE_API_URL
export default function Login() {
        const [emailErr, setEmailErr] = useState()
        const [passwordErr, setPasswordErr] = useState()
    const { signUp, showSignup }  = useContext(Context)
    const { setLoginPop, setuplogin } = useContext(Context)
    const { setUserName} = useContext(Context)
    const { popupLoading, setPopupLoading } = useContext(Context)

    const [loading, setLoading] = useState(false)
    const loginUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const email = formData.get('email').toLowerCase()
        const password = formData.get('password')
        try {
            const res = await fetch(`${API_BASE}/users/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })
            const reqRes = await res.json()
            if (res.ok) {
                e.target.reset()
                setEmailErr('')
                setPasswordErr('')
                    setLoading(false);
                    setLoginPop(false)
                    setUserName(reqRes.username)
                
            }
            if (reqRes.errors) {
                setEmailErr(reqRes.errors.email)
                setPasswordErr(reqRes.errors.password)
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { setPopupLoading(false); }, [])
    return (
        <> 
            {!signUp &&
                <div className='pop-up'>
                    <div className="form-container">
                        <div className="remove-loginPop">
                            <button className="remove-loginPop" onClick={() => setLoginPop(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg>
                            </button>
                        </div>
                        <form className="login-form" onSubmit={loginUser}>
                            <h2>Welcome Back</h2>

                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                className="email"
                                placeholder="you@example.com"
                            />
                            <div className="email-err">{emailErr}</div>

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="password"
                                placeholder="••••••••"
                            />
                            <div className="password-err">{passwordErr}</div>
                            <div className="forgot-div"><a href="#" className="forgot-link">Forgot Password</a></div>
                            <button type="submit">Log in</button>
                            <p>Don't have an account?<a href="#" onClick={showSignup}>Signup</a></p>
                           
                        </form>
                    </div>
                </div>
            }
            {loading && <Loader />}
            {popupLoading && <Loader />}
            {signUp && <SignUp />}
          
       </>
    );
}
