import React from 'react'
import {FaWindowClose} from 'react-icons/fa'
import CreatableSelect from 'react-select/creatable'

function NewExpense(props) {

    const categories = [...new Set(props.expenseList.map(item => item.category))].sort().map(item => (
        {value: item, label: item}
    ))

  return (
    <div className='w-full max-w-7xl bg-neutral-200 lg:p-4 lg:mx-auto overflow-visible'>
        <button onClick={() => props.setModalIsOpen(false)} className='text-red-600 rounded text-4xl'><FaWindowClose /></button>
        <form onSubmit={props.addExpense} className='w-full overflow-visible'>
            <div className='grid grid-cols-12 gap-2 my-4 p-2 text-sm md:text-base lg:mt-12 overflow-visible'>
                <input className='col-span-4 border-2 border-slate-800 rounded-md py-1 px-1.5 ' type='text' name='description' placeholder='Description' required />
                <CreatableSelect options={categories} className='col-span-3 border-2 border-slate-800 rounded-md overflow-visible' name='category' placeholder='Category...' required />
                <input className='col-span-3 md:col-span-3 border-2 border-slate-800 rounded-md py-1 px-1.5' type='date' name='date' required />
                <input className='col-span-2 border-2 border-slate-800 rounded-md py-1 px-1.5' type='number' name='cost' placeholder='Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <button className='block w-5/6 bg-green-500 py-2 my-2 mx-auto text-center rounded-md shadow-sm font-bold max-w-lg' type='submit'>Add Expense</button>
        </form>
    </div>
  )
}

export default NewExpense