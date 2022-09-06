import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        const user = {
            name: e.target.registerName.value,
            email: e.target.registerEmail.value,
            password: e.target.registerPassword.value
        }
        try{
            await axios.post('/api/auth/register', user)
        }catch(err){
            console.log(err)
        }
    }

    const login = async (e) => {
        e.preventDefault()
        const email = e.target.loginEmail.value
        const password = e.target.loginPassword.value
        try{
            await axios.post('/api/auth/login', {email, password})
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor='loginEmail'>
                    Email
                    <input type='email' name='loginEmail' placeholder='email' required />
                </label>
                <label htmlFor='loginPassword'>
                    Password
                    <input type='password' name='loginPassword' placeholder='password' required />
                </label>
                <button type='submit'>Login</button>
            </form>
        </div>
        <div>
            <h1>Register</h1>
            <form onSubmit={register}>
                <label htmlFor='registerName'>
                    Name
                    <input type='text' name='registerName' placeholder='Name' required />
                </label>
                <label htmlFor='registerEmail'>
                    Email
                    <input type='email' name='registerEmail' placeholder='email' required />
                </label>
                <label htmlFor='registerPassword'>
                    Password
                    <input type='password' name='registerPassword' placeholder='password' required />
                </label>
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login