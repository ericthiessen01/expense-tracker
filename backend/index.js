import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import cookieParser from "cookie-parser";

const PORT = process.emitWarning.PORT || 8000
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', allRoutes)

app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(status).json({message, stack: err.stack})
})

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('DB connected')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

app.listen(PORT, () => {
    connectDB()
    console.log(`server is running on port ${PORT}`)
})