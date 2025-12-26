
//MongoDB connection handler for your Node.js backend using Mongoose.
/* this file ensure,
        Import environment variables (like DB_URI)

        Make sure DB_URI exists

        Connect to MongoDB Atlas using mongoose.connect()

        Show logs depending on the environment (development or production)

        Stop the server if database connection fails
*/
import mongoose from "mongoose";
import { NODE_ENV,DB_URI } from "../config/env.js";

if(!DB_URI){
    throw new Error('Please define the MONGO_BD_URI environment variable inside .env.<development/>production>.local');
}

//connect to database

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`connect to database in ${NODE_ENV} mode`);

    }catch(error){
        console.error('Error connecting to database:', error);

        process.exit(1);
    }
}

export default connectToDatabase;