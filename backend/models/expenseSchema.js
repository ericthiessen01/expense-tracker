import mongoose from 'mongoose'

const { Schema } = mongoose

const expenseSchema = new Schema({
    description: String,
    date: Date,
    cost: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
},{timestampes: true})

export default mongoose.model('Expense', expenseSchema)