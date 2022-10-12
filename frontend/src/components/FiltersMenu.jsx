import React from 'react'

function FiltersMenu(props) {

    const categories = [...new Set(props.expenseList.map(item => item.category))].sort().map(item => (
        {value: item, label: item.charAt(0).toUpperCase() + item.slice(1)}
    ))

    const categoryInputs = categories.map((item, i) => (
        <div key={item.value}>
            <label>
                <input type='checkbox' name='category[]' value={item.value} />
            {item.label}</label>
        </div>
    ))

  return (
    <div className='w-full sm:w-2/4 lg:w-2/6 2xl:w-1/4 bg-red-500 h-[92vh] fixed top-[8vh] right-0 shadow-lg overflow-y-auto  p-2 border-t-2 border-gray-200'>
        <button onClick={() => props.toggleFilters()}>close</button>
        <form onSubmit={props.applyFilterOptions} className='overflow-visible'>
            {categoryInputs}
            <input className='' type='date' name='dateStart' />
            <input className='' type='date' name='dateEnd' />
            <input className='' type='number' name='minAmount' placeholder='Min Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <input className='' type='number' name='maxAmount' placeholder='Max Amount' pattern='^\d*(\.\d{1,2})?$' step='.01' />
            <button type='submit'>Apply Filters</button>
        </form>
    </div>
  )
}

export default FiltersMenu