import React from 'react'
import { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 

function FiltersMenu(props) {
    // useRef to hold checkbox values then pass to setState
    const [categoriesArr, setCategoriesArr] = useState([])
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: "selection"
        }
      ]);

    const categories = [...new Set(props.expenseList.map(item => item.category))].sort().map(item => (
        {value: item, label: item.charAt(0).toUpperCase() + item.slice(1)}
    ))

    const handleChange = (category) => {
        setCategoriesArr(prev => {
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
        props.setFilterOptions(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const categoryInputs = categories.map(item => (
        <div key={item.value}>
            <label>
                <input onChange={() => handleChange(item.value)} type='checkbox' name='category' value={item.value} />
            {item.label}</label>
        </div>
    ))

  return (
    <div className='w-full sm:w-2/4 lg:w-2/6 2xl:w-1/4 bg-red-500 h-[92vh] fixed top-[8vh] right-0 shadow-lg overflow-y-auto  p-2 border-t-2 border-gray-200'>
        <button onClick={() => props.toggleFilters()}>close</button>
        <form onSubmit={props.applyFilterOptions} className='overflow-visible'>
            {categoryInputs}
            <input type='hidden' name='categories' value={categoriesArr} />
            {/* <input className='' onChange={updateData} value={props.filterOptions.dateStart} type='date' name='dateStart' />
            <input className='' onChange={updateData} value={props.filterOptions.dateEnd} type='date' name='dateEnd' /> */}
            <DateRange 
                className='text-sm overflow-hidden'
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
            <input className='' onChange={updateData} value={props.filterOptions.minAmount} type='number' name='minAmount' placeholder='Min Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <input className='' onChange={updateData} value={props.filterOptions.maxAmount} type='number' name='maxAmount' placeholder='Max Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <button type='submit'>Apply Filters</button>
        </form>
    </div>
  )
}

export default FiltersMenu