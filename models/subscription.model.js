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
        enum: ['sports', 'news', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },
    paymentMethod:{
        type:String,
        required: true,
        trim:true
    },
    status:{
        type:String,
        enum:['active', 'cancelled', 'expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        //Date validate using validaror function
        validator: (value)=> value <= new Date(),
        message: 'Start date must be in the past'
    },
    renewaltDate:{
        type:Date,
        //Date validate using validaror function (validate properties before they enter)
        validator: function (value) {value > this.startDate()
        },
        message: 'Renewal date must be after the start date',
    },
    user:{
        //get users user id
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index:true,
    }

}, {timestamps:true}
);

//auto-calculate renewal date if missing
//below code snipt help to learn how to call- 
// -deferent action based on deferent criteria before the document save
//and preform additional logics and update accordingly

subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };

        this.renewaltDate=new Date(this.startDate);
        this.renewaltDate.setDate(this.renewaltDate.getDate() +renewalPeriods[this.frequency])
    }

    //Auto-update the status if renewal date has passed
    if(this.renewaltDate< new Date()){
        this.status ='expired';
    }

    next();
})

const Subscription =mongoose.model('Subscription', subscriptionSchema);

export default Subscription;