import express from 'express'
import { createExpense, updateExpense, getUserExpenses, deleteExpense } from '../controllers/expense.js'

const router = express.Router()

router.post('/', createExpense)
router.put('/:expenseId', updateExpense)
router.get('/myExpenses', getUserExpenses)
router.delete('/:expenseId', deleteExpense)

export default router