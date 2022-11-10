import React from 'react'
import { DateRange } from 'react-date-range';
import {FaWindowClose} from 'react-icons/fa'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

function FiltersMenu(props) {

    const categories = [...new Set(props.expenseList.map(item => item.category))].sort().map(item => (
        {value: item, label: item.charAt(0).toUpperCase() + item.slice(1)}
    ))

    const handleChange = (category) => {
        props.setCategoryFilter(prev => {
            const i = prev.indexOf(category)
            if(i === -1){
                return [...prev, category]
            } else {
                return prev.filter(v => v != category)
            }
        })
    }

    function updateData(e) {
        const {name, value} = e.target
        props.setCostFilter(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function closeForm(e) {
        e.preventDefault()
        props.setShowFilters(prev => !prev)
    }

    const resetFilters = () => {
        props.setCategoryFilter([])
        props.setCostFilter({
            minAmount: '',
            maxAmount: '',
        })
        props.setDateFilter([
            {
              startDate: null,
              endDate: null,
              key: "selection"
            }
          ])
    }
    
    const categoryInputs = categories.map(item => (
            <label key={item.value}>
                <input onChange={() => handleChange(item.value)} className='mr-2' type='checkbox' name='category' value={item.value} checked={props.categoryFilter.includes(item.value)} />
                {item.label}
            </label>
    ))

  return (
    <div className='w-full sm:w-[420px] bg-neutral-200 h-[92vh] fixed top-[8vh] right-0 shadow-lg overflow-y-auto p-2 border-t-2 border-gray-200'>
        <button onClick={() => props.setShowFilters(prev => !prev)} className='text-red-600 bg-slate-50 rounded text-4xl text-right hover:shadow-md hover:text-rose-600 transition-all'><FaWindowClose /></button>
        <form onSubmit={closeForm} className='w-full overflow-visible flex flex-col p-2 '>
            <div className='flex gap-6 p-2 flex-wrap'>
                {categoryInputs}
            </div>
            <DateRange 
                className='text-xs overflow-hidden my-2 mx-auto sm:text-sm'
                onChange={item => props.setDateFilter([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={props.dateFilter}
            />
            <div className='flex justify-around'>
                <input className='w-5/12 my-2 border-2 border-slate-800 rounded-md py-1 px-1.5' onChange={updateData} value={props.costFilter.minAmount} type='number' name='minAmount' placeholder='Min Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
                <input className='w-5/12 my-2 border-2 border-slate-800 rounded-md py-1 px-1.5' onChange={updateData} value={props.costFilter.maxAmount} type='number' name='maxAmount' placeholder='Max Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            </div>
            <div className='flex justify-around'>
                <button className='bg-green-500 py-2 px-5  my-4 rounded-md shadow-sm text-lg hover:shadow-md hover:bg-lime-500 transition-all' type='submit'>Apply Filters</button>
                <button className='border-2 border-green-500 py-2 px-5  my-4 rounded-md shadow-sm text-lg hover:shadow-md hover:border-lime-500 transition-all' onClick={resetFilters} >Reset Filters</button>
            </div>
        </form>
    </div>
  )
}

export default FiltersMenu