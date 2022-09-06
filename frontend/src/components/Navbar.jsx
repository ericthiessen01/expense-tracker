import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
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
    <div>
        <h1>Expense Tracker</h1>
        {user && 
        <div>
            <h2>Welcome back {user.name}!</h2>
            <button type='button' onClick={logout} >Logout</button>
        </div>
        }
    </div>
  )
}

export default Navbar