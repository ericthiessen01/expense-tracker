import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {FaTrashAlt, FaSort} from 'react-icons/fa'

function Expense() {
    const [sortType, setSortType] = useState('')
    const [expenseList, setExpenseList] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    const getExpenses = async() => {
        try{
            const {data} = await axios.get('/api/expense/myExpenses')
            const sum = data.reduce((acc, obj) => {
                return acc + obj.cost
            }, 0)
            function sortedData() {
                if(sortType === 'oldToNew'){
                    return data.sort((a, b) => a.date.localeCompare(b.date))
                }if(sortType === 'newToOld'){
                    return data.sort((a, b) => b.date.localeCompare(a.date))
                }if(sortType === 'lowToHigh'){
                    return data.sort((a, b) => a.cost - b.cost)
                }if(sortType === 'highToLow'){
                    return data.sort((a, b) => b.cost - a.cost)
                }else{
                    return data
                }
            }
            setExpenseList(sortedData())
            setTotalAmount(sum)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getExpenses()
    }, [sortType])
    
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

    const dateSort = () => {
        setSortType(prev => {
            return prev === 'oldToNew' ? 'newToOld' : 'oldToNew' 
        })
    }

    const amountSort = () => {
        setSortType(prev => {
            return prev === 'highToLow' ? 'lowToHigh' : 'highToLow' 
        })
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
    <div className='w-full max-w-5xl bg-neutral-100 lg:p-4 lg:mx-auto'>
        <div className='grid grid-cols-12 items-center p-2 font-bold md:text-lg border-b-2 border-green-500'>
            <p className='col-span-5' >Description</p>
            <p className='col-span-3 cursor-pointer' onClick={() => dateSort()} >Date<FaSort className='inline'/></p>
            <p className='col-span-3 md:col-span-2 text-right overflow-visible cursor-pointer' onClick={() => amountSort()} >Amount<FaSort className='inline'/></p>
        </div>
        {expenseHtml}
        <div className='grid grid-cols-12 items-center p-2 font-bold md:text-lg'>
            <p className='col-span-8'>Total</p>
            <p className='col-span-2 text-right'>{totalAmount.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
            })}</p>
        </div>
        <form onSubmit={addExpense} className='w-full'>
            <div className='grid grid-cols-12 gap-2 my-4 p-2 text-sm md:text-base'>
                <input className='col-span-5 border-2 border-slate-800 rounded-md py-1 px-1.5 ' type='text' name='description' placeholder='Description' required />
                <input className='col-span-3 md:col-span-4 border-2 border-slate-800 rounded-md py-1 px-1.5' type='date' name='date' required />
                <input className='col-span-3 border-2 border-slate-800 rounded-md py-1 px-1.5' type='number' name='cost' placeholder='Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <button className='block w-5/6 bg-green-500 py-2 my-2 mx-auto text-center rounded-md shadow-sm font-bold max-w-lg' type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default Expense