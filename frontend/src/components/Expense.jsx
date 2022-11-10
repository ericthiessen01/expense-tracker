import React from 'react'
import Modal from 'react-modal'
import { useState, useCallback, useContext } from 'react'
import {Context} from '../hooks/Context'
import {FaSort, FaFilter} from 'react-icons/fa'
import NewExpense from './NewExpense'
import ModifyExpense from './ModifyExpense'
import FiltersMenu from './FiltersMenu'
import ExpenseItem from './ExpenseItem'

Modal.setAppElement('#root')
function Expense() {
    const {expenseList, loading, addExpense, updateExpense, deleteExpense, modifyItem, setModifyItem} = useContext(Context)

    const [sortType, setSortType] = useState('oldToNew')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState([])
    const [costFilter, setCostFilter] = useState({
        minAmount: '',
        maxAmount: '',
    })
    const [dateFilter, setDateFilter] = useState([
        {
          startDate: null,
          endDate: null,
          key: "selection"
        }
      ])

    const sortedData = (data) => {
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

    // expense.date is in GMT while filter.date is local time hence the mess below. Need to find a better solution
    const timeZoneOffset = new Date().getTimezoneOffset() * 60
      
    const filteredItems = useCallback(() => {
        return expenseList.filter(item => {
            const checkCategoryFilter = categoryFilter.length > 0 ? categoryFilter.includes(item.category) : true
            const minFilter = costFilter.minAmount ? item.cost > costFilter.minAmount : true
            const maxFilter = costFilter.maxAmount ? item.cost < costFilter.maxAmount : true
            const startFilter = dateFilter[0].startDate ? Math.floor(new Date(item.date).getTime() / 1000) >= Math.floor(new Date(dateFilter[0].startDate).getTime() / 1000) - timeZoneOffset : true
            const endFilter = dateFilter[0].endDate ? Math.floor(new Date(item.date).getTime() / 1000) <= Math.floor(new Date(dateFilter[0].endDate).getTime() / 1000) - timeZoneOffset : true
            return (
                checkCategoryFilter &&
                minFilter &&
                maxFilter &&
                startFilter &&
                endFilter
                )
        })
    }, [showFilters, loading])

    const handleDelete = () => {
        deleteExpense()
        setModifyModalIsOpen(false)
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

    const openModifyExpense = (id) => {
        setModifyItem(expenseList.find(item => item._id === id))
        setModifyModalIsOpen(true)
    }

    const totalCost = filteredItems().reduce((acc, obj) => {
        return acc + obj.cost
    }, 0)
    
    const expenseItems = sortedData(filteredItems()).map(item => (
        <ExpenseItem 
            key={item._id}
            {...item}
            openModifyExpense={openModifyExpense}
        />
    ))

  return (
    <>
        <div className='w-full max-w-7xl bg-neutral-100 lg:mt-6 lg:rounded-md lg:p-4 lg:mx-auto'>
            <p className='ml-auto w-fit py-1 px-2 my-1 font-bold md:text-lg cursor-pointer hover:underline hover:text-green-600' onClick={() => setShowFilters(prev => !prev)}>Filters <FaFilter className='inline'/></p>
            <div className='grid grid-cols-12 items-center p-2 font-bold md:text-lg border-b-2 border-green-500'>
                <p className='col-span-4' >Description</p>
                <p className='col-span-3'>Category</p>
                <p className='col-span-2 md:col-span-3 cursor-pointer hover:underline hover:text-green-600' onClick={() => dateSort()} >Date <FaSort className='inline'/></p>
                <p className='col-span-3 md:col-span-2 text-right overflow-visible cursor-pointer hover:underline hover:text-green-600' onClick={() => amountSort()} >Amount <FaSort className='inline'/></p>
            </div>
            {expenseItems}
            <div className='grid grid-cols-12 items-center px-3 pt-6 font-bold md:text-xl'>
                <p className='col-span-9'>Total:</p>
                <p className='col-span-3 text-right overflow-visible'>{totalCost.toLocaleString("en-US", {
                    style: "currency", 
                    currency: "USD", 
                })}</p>
            </div>
            <button onClick={() => setModalIsOpen(true)} className='block bg-green-500 py-2 px-5 my-2 mx-auto text-xl rounded-md shadow-sm font-medium max-w-lg hover:shadow-md hover:bg-lime-500 transition-all'>Add New Expense</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='max-w-6xl h-2/6 mx-auto mt-64 p-2 bg-neutral-200 rounded-lg overflow-visible' >
                <NewExpense 
                    addExpense={addExpense}
                    setModalIsOpen={setModalIsOpen}
                    expenseList={expenseList} 
                />
            </Modal>
            <Modal isOpen={modifyModalIsOpen} onRequestClose={() => setModifyModalIsOpen(false)} className='max-w-6xl h-2/6 mx-auto mt-64 p-2 bg-neutral-200 rounded-lg overflow-visible'>
                <ModifyExpense 
                    setModifyModalIsOpen={setModifyModalIsOpen}
                    expenseList={expenseList}
                    updateExpense={updateExpense}
                    handleDelete={handleDelete}
                    modifyItem={modifyItem} 
                />
            </Modal>
        </div>
        {showFilters && <FiltersMenu 
            setShowFilters={setShowFilters}
            expenseList={expenseList}
            costFilter={costFilter}
            setCostFilter={setCostFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
        />}
    </>
  )
}

export default Expense