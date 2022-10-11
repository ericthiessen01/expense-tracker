import Expense from '../models/expenseSchema.js'
import createError from '../utils/error.js'

export const createExpense = async (req, res, next) => {
    try{
        const newExpense = new Expense({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            cost: req.body.cost,
            user: req.user.id
        })
        const savedExpense = await newExpense.save()
        return res.status(201).json(savedExpense)
    }catch(err){
        return next(err)
    }
}

export const updateExpense = async (req, res, next) => {
    try{
        const expense = await Expense.findById(req.params.expenseId).exec()
        if(!expense) return next(createError({
            statues: 404, 
            message: 'Expense not found'
        }))
        if(expense.user.toString() !== req.user.id) return next(createError({
            status: 401,
            message: 'Access restricted'
        }))
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseId, {
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            cost: req.body.cost
        }, {new: true})
        return res.status(200).json(updatedExpense)
    }catch(err){
        return next(err)
    }
}

export const getUserExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.find({user: req.user.id})
        return res.status(200).json(expenses)
    }catch(err){
        return next(err)
    }
}

export const deleteExpense = async (req, res, next) => {
    try{
        const expense = await Expense.findById(req.params.expenseId).exec()
        if(!expense) return next(createError({
            statues: 404, 
            message: 'Expense not found'
        }))
        if(expense.user.toString() !== req.user.id) return next(createError({
            status: 401,
            message: 'Access restricted'
        }))
        await Expense.findByIdAndDelete(req.params.expenseId)
        return res.status(200).json('Expense deleted')
    }catch(err){
        return next(err)
    }
}