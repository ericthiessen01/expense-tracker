import express from "express"
import authRoutes from './auth.js'
import usersRoutes from './users.js'
import expenseRoutes from './expense.js'
import checkAuth from "../utils/checkAuth.js"

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', checkAuth, usersRoutes)
router.use('/expense', checkAuth, expenseRoutes)

export default router