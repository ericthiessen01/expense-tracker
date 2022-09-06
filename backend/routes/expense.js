import express from 'express'
import { createExpense } from '../controllers/expense.js'

const router = express.Router()

router.post('/', createExpense)

export default router