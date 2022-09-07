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
        <div key={item._id} className='grid grid-cols-12 items-center mb-2 p-2 shadow'>
            <p className='col-span-5' >{item.description}</p>
            <p className='col-span-3' >{new Date(item.date).toLocaleDateString(undefined, {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })}</p>
            <p className='col-span-2' >{item.cost.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
            })}</p>
            <button className='col-span-2 justify-self-center p-2 bg-red-600 text-slate-50 rounded' onClick={() => deleteExpense(item._id)}><FaTrashAlt /></button>
        </div>
    ))

  return (
    <div className='w-full'>
        <div className='grid grid-cols-12 items-center mb-2 p-2'>
            <p className='col-span-5' >Description</p>
            <p className='col-span-3' >Date</p>
            <p className='col-span-2' >Amount</p>
        </div>
        {expenseHtml}
        <form onSubmit={addExpense} className='w-full'>
            <div className='flex justify-between mb-4 p-2'>
                <input className='w-2/6' type='text' name='description' placeholder='Description' required />
                <input className='w-2/6' type='date' name='date' required />
                <input className='w-1/6' type='number' name='cost' placeholder='Cost' pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <button className='block w-5/6 bg-green-400 py-2 my-2 mx-auto text-center rounded-md shadow-sm' type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default Expense