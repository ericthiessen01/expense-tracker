import React from 'react'
import { DateRange } from 'react-date-range';
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

    function updateData(event) {
        const {name, value} = event.target
        props.setCostFilter(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const categoryInputs = categories.map(item => (
        <div key={item.value}>
            <label>
                <input onChange={() => handleChange(item.value)} type='checkbox' name='category' value={item.value} checked={props.categoryFilter.includes(item.value)} />
            {item.label}</label>
        </div>
    ))

  return (
    <div className='w-full sm:w-2/4 lg:w-2/6 2xl:w-1/4 bg-red-500 h-[92vh] fixed top-[8vh] right-0 shadow-lg overflow-y-auto  p-2 border-t-2 border-gray-200'>
        <button onClick={() => props.toggleFilters()}>close</button>
        <div className='overflow-visible'>
            {categoryInputs}
            <DateRange 
                className='text-sm overflow-hidden'
                onChange={item => props.setDateFilter([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={props.dateFilter}
            />
            <input className='' onChange={updateData} value={props.costFilter.minAmount} type='number' name='minAmount' placeholder='Min Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <input className='' onChange={updateData} value={props.costFilter.maxAmount} type='number' name='maxAmount' placeholder='Max Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <button onClick={() => props.toggleFilters()}>Apply Filters</button>
        </div>
    </div>
  )
}

export default FiltersMenu