import React from 'react'

function ExpenseItem(props) {
  return (
    <div key={props._id} onClick={() => props.openModifyExpense(props._id)} className='grid grid-cols-12 items-center py-4 px-2 text-sm md:text-base shadow max-w-full lg:mx-auto hover:shadow-md hover:bg-neutral-200 transition-all cursor-pointer'>
        <p className='col-span-4 first-letter:uppercase' >{props.description}</p>
        <p className='col-span-3 first-letter:uppercase'>{props.category}</p>
        <p className='col-span-3' >{new Date(props.date).toLocaleDateString(undefined, {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })}</p>
        <p className='col-span-2 text-right' >{props.cost.toLocaleString("en-US", {
            style: "currency", 
            currency: "USD", 
        })}</p>
    </div>
  )
}

export default ExpenseItem