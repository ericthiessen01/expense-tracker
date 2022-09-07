import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {FaTrashAlt} from 'react-icons/fa'

function Expense() {
    const [expenseList, setExpenseList] = useState([])

    const getExpenses = async() => {
        try{
            const {data} = await axios.get('/api/expense/myExpenses')
            setExpenseList(data.sort((a, b) => a.date.localeCompare(b.date)))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getExpenses()
    }, [])
    
    const addExpense = async (e) => {
        e.preventDefault()
        const newExpense = {
            description: e.target.description.value,
            date: e.target.date.value,
            cost: e.target.cost.value
        }
        e.target.reset()
        try{
            await axios.post('/api/expense/', newExpense)
            getExpenses()
        }catch(err){
            console.log(err)
        }
    }
    
    const deleteExpense = async(id) => {
        try{
            await axios.delete(`/api/expense/${id}`)
            getExpenses()
        }catch(err){
            console.log(err)
        }
    }
    
    const expenseHtml = expenseList.map(item => (
        <div key={item._id} className='flex justify-between'>
            <p>{item.description}</p>
            <p>{new Date(item.date).toLocaleDateString(undefined, {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })}</p>
            <p>{item.cost.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
            })}</p>
            <button onClick={() => deleteExpense(item._id)}><FaTrashAlt /></button>
        </div>
    ))

  return (
    <div>
        {expenseHtml}
        <form onSubmit={addExpense}>
            <div className='flex justify-between'>
                <input className='w-2/6' type='text' name='description' placeholder='Description' required />
                <input className='w-3/6' type='date' name='date' required />
                <input className='w-1/6' type='number' name='cost' placeholder='Cost' pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <button className='w-full bg-green-400 py-2' type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default Expense