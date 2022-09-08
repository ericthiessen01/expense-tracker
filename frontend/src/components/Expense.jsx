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
        <div key={item._id} className='grid grid-cols-12 items-center py-4 px-2 text-sm md:text-base shadow max-w-5xl lg:mx-auto'>
            <p className='col-span-5' >{item.description}</p>
            <p className='col-span-3' >{new Date(item.date).toLocaleDateString(undefined, {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })}</p>
            <p className='col-span-2 text-right' >{item.cost.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
            })}</p>
            <button className='col-span-2 justify-self-center p-2 bg-red-600 text-slate-50 rounded text-base md:text-lg lg:justify-self-end lg:mr-4' onClick={() => deleteExpense(item._id)}><FaTrashAlt /></button>
        </div>
    ))

  return (
    <div className='w-full max-w-5xl lg:mx-auto'>
        <div className='grid grid-cols-12 items-center p-2 font-bold text-lg border-b-2 border-green-500'>
            <p className='col-span-5' >Description</p>
            <p className='col-span-3' >Date</p>
            <p className='col-span-2 text-right overflow-visible' >Amount</p>
        </div>
        {expenseHtml}
        <form onSubmit={addExpense} className='w-full'>
            <div className='flex justify-between my-4 p-2'>
                <input className='w-2/6 text-sm border-2 border-slate-800 rounded-md py-1 px-1.5 ' type='text' name='description' placeholder='Description' required />
                <input className='w-2/6 text-sm border-2 border-slate-800 rounded-md py-1 px-1.5' type='date' name='date' required />
                <input className='w-1/6 text-sm border-2 border-slate-800 rounded-md py-1 px-1.5' type='number' name='cost' placeholder='Cost' pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <button className='block w-5/6 bg-green-500 py-2 my-2 mx-auto text-center rounded-md shadow-sm font-bold max-w-lg' type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default Expense