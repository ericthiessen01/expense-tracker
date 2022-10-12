import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
// import { FaBars } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'

function Navbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const {auth} = useAuth()

    const getUser = async() => {
        try{
            if(auth) {
                const {data} = await axios.get('/api/users/user')
                setUser(data)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [auth])

    const logout = async() => {
        try{
            await axios.get('/api/auth/logout')
            setUser(null)
            navigate('/login')
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='flex justify-between items-center px-4 h-[8vh] bg-stone-100 border-b-2 font-bold'>
        <h1 className='text-green-600 text-2xl'>Expense Tracker</h1>
        {user && 
        <div>
            {/* <h2>Welcome back {user.name}!</h2> */}
            <button className='block bg-green-500 py-2 px-5 mx-auto md:text-xl rounded-md shadow-sm font-medium max-w-lg hover:shadow-md hover:bg-lime-500 transition-all' type='button' onClick={logout} >Logout</button>
        </div>
        }
    </div>
  )
}

export default Navbar