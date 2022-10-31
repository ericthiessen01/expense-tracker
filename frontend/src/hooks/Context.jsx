import React, {useState, useEffect} from "react"
import axios from 'axios'

const Context = React.createContext()

function ContextProvider({children}) {
    const [expenseList, setExpenseList] = useState([])
    const [modifyItem, setModifyItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const getExpenses = async() => {
        try{
            setLoading(true)
            const {data} = await axios.get('/api/expense/myExpenses')
            setExpenseList(data)
            setLoading(false)
            console.log('api call')
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
            category: e.target.category.value,
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

    const updateExpense = async (e) => {
        e.preventDefault()
        const updatedExpense = {
            description: e.target.description.value,
            category: e.target.category.value,
            date: e.target.date.value,
            cost: e.target.cost.value
        }
        try{
            await axios.put(`/api/expense/${modifyItem._id}`, updatedExpense)
            getExpenses()
        }catch(err){
            console.log(err)
        }
    }
    
    const deleteExpense = async() => {
        try{
            await axios.delete(`/api/expense/${modifyItem._id}`)
            getExpenses()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Context.Provider value={{
            expenseList: expenseList,
            loading: loading,
            addExpense: addExpense,
            updateExpense: updateExpense,
            deleteExpense: deleteExpense,
            modifyItem: modifyItem,
            setModifyItem: setModifyItem
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}