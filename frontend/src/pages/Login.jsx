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
    <div className='max-w-lg mx-auto'>
        <div>
            <form className='w-5/6 mx-auto' onSubmit={login}>
                <label className='block my-4' htmlFor='loginEmail'>
                    Email
                    <input className='w-full block border-2 border-slate-800 rounded-md py-1 px-1.5' type='email' name='loginEmail' placeholder='email' required />
                </label>
                <label className='block my-4' htmlFor='loginPassword'>
                    Password
                    <input className='w-full block border-2 border-slate-800 rounded-md py-1 px-1.5' type='password' name='loginPassword' placeholder='password' required />
                </label>
                <button className='block w-full bg-green-500 py-2 my-4 mx-auto text-center rounded-md shadow-md font-bold' type='submit'>Login</button>
            </form>
        </div>
        <div>
            <form className='w-5/6 mx-auto' onSubmit={register}>
                <label className='block my-4' htmlFor='registerName'>
                    Name
                    <input className='w-full block border-2 border-slate-800 rounded-md py-1 px-1.5' type='text' name='registerName' placeholder='Name' required />
                </label>
                <label className='block my-4' htmlFor='registerEmail'>
                    Email
                    <input className='w-full block border-2 border-slate-800 rounded-md py-1 px-1.5' type='email' name='registerEmail' placeholder='email' required />
                </label>
                <label className='block my-4' htmlFor='registerPassword'>
                    Password
                    <input className='w-full block border-2 border-slate-800 rounded-md py-1 px-1.5' type='password' name='registerPassword' placeholder='password' required />
                </label>
                <button className='block w-full bg-green-500 py-2 my-2 mx-auto text-center rounded-md shadow-md font-bold' type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login