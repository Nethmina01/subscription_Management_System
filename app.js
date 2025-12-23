//creating express server
import express from "express";

import {PORT} from './config/env.js'

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";


const app =express();

//api/v1/auth/sign-up
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscription',subscriptionRouter);

//first route
app.get('/', (req, res)=>{
    res.send("Welcome to the Subscription management API");
});

app.listen(PORT, ()=>{
    console.log(`Subscription tracking API is running on http://localhost:${PORT} `);
})

export default app;