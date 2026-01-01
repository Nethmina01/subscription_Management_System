//creating express server
import express from "express";

import {PORT} from './config/env.js'


import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectToDatabase from "./database/mongodb.js"
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.routes.js";
//import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


const app =express();

// Parses incoming JSON payloads and makes them available under req.body
app.use(express.json());

// Parses URL-encoded form data (e.g., from HTML forms) and adds it to req.body
// extended: false → uses the classic querystring library (simpler parsing)
app.use(express.urlencoded({ extended: false }));

// Parses cookies from the incoming request headers and makes them available under req.cookies
app.use(cookieParser());

//app.use(arcjetMiddleware)


//api/v1/auth/sign-up
app.use('/api/v1/auth',authRouter);

//Any request starting with /api/v1/user goes to user.routes.js
app.use('/api/v1/user',userRouter);

app.use('/api/v1/subscription',subscriptionRouter);

//add workflow
app.use('/api/v1/workflows',workflowRouter);

app.use(errorMiddleware);

//first route
app.get('/', (req, res)=>{
    res.send("Welcome to the Subscription management API");
});

app.listen(PORT, async()=>{
    console.log(`Subscription tracking API is running on http://localhost:${PORT} `);

    await connectToDatabase();
})

export default app;