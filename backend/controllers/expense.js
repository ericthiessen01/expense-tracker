import Expense from '../models/expenseSchema.js'
import createError from '../utils/error.js'

export const createExpense = async (req, res, next) => {
    try{
        const newExpense = new Expense({
            description: req.body.description,
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