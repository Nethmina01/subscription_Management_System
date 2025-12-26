import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength:2,
        maxLength:100,
    },
    price:{
        type:Number,
        required: [true, 'Subscription Price is required'],
        min: [0,'Price must be greater than 0'],
        maxLength:100,
    },
    currency:{
        type: String,
        enum: ['Rs','USD'],
        default: 'Rs'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category:{
        type: String,
        enum: ['sports', 'news', '']
    }
}, {timestamps:true}
);

export default subscriptionSchema;