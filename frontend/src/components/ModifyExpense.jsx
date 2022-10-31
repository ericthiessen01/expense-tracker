import React from 'react'
import {FaWindowClose} from 'react-icons/fa'
import CreatableSelect from 'react-select/creatable'

function ModifyExpense(props) {
    
    const capFirstLetter = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const categories = [...new Set(props.expenseList.map(item => item.category))].sort().map(item => (
        {value: item, label: capFirstLetter(item)}
    ))

  return (
    <div className='w-full max-w-7xl bg-neutral-200 lg:p-4 lg:mx-auto overflow-visible'>
        <button onClick={() => props.setModifyModalIsOpen(false)} className='text-red-600 bg-slate-50 rounded text-4xl text-right hover:shadow-md hover:text-rose-600 transition-all'><FaWindowClose /></button>
        <form onSubmit={props.updateExpense} className='w-full overflow-visible'>
            <div className='grid grid-cols-12 gap-2 my-4 p-2 text-sm md:text-base lg:mt-12 overflow-visible'>
                <input className='col-span-4 border-2 border-slate-800 rounded-md py-1 px-1.5 ' type='text' name='description' defaultValue={capFirstLetter(props.modifyItem.description)} required />
                <CreatableSelect options={categories} className='col-span-3 border-2 border-slate-800 rounded-md overflow-visible' name='category' defaultValue={{label: capFirstLetter(props.modifyItem.category), value: props.modifyItem.category}} required />
                <input className='col-span-3 md:col-span-3 border-2 border-slate-800 rounded-md py-1 px-1.5' type='date' name='date' defaultValue={props.modifyItem.date.substr(0, 10)} required />
                <input className='col-span-2 border-2 border-slate-800 rounded-md py-1 px-1.5' type='number' name='cost' defaultValue={props.modifyItem.cost.toFixed(2)} pattern='^\d*(\.\d{1,2})?$' step='.01' required />
            </div>
            <div className='flex justify-around'>
                <button className=' bg-green-500 py-2 px-5 rounded-md shadow-sm text-lg hover:shadow-md hover:bg-lime-500 transition-all' type='submit'>Update Expense</button>
                <button className=' bg-red-600 py-2 px-5 text-slate-50 rounded-md shadow-sm text-lg hover:shadow-md hover:bg-rose-600 transition-all' onClick={() => props.handleDelete()}>Delete Expense</button>
            </div>
        </form>
    </div>
  )
}

export default ModifyExpense