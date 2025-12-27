import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';


export const signUp =async(req, res,next)=>{
    const session =await mongoose.startSession();
    session.startTransaction();

    try{
        //create a new user

        //connecting database 
        const { name, email, password } = req.body;

        //check iƒ the user is already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode= 409;
            throw error;
        }
        else{
            //add code later
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUsers = await User.create([{name, email, password : hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            {
                success: true,
                message: 'User created Successfully',
                data:{
                    token,
                    user: newUsers[0],
                }
            }
        )

    } catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
        }
}


export const signIn =async(req, res, next)=>{
    //Implement sign in logic here
    try{

        const { email, password} =req.body;

        const user =await User.findOne({email});

        if(!user){
            const error =new Error('User not Found');
            error.statusCode =404;
            throw error;
        }

        //check and compare the user entered password with the existing password
        // use bcrypt to hash the use entered password

        const isPasswordValid = await bcrypt.compare(password, user.password);

        //if password is invalid

        if(!isPasswordValid){
            const error =new Error('Invalid password');
            error.statusCode=401;
            throw error;
        }

        // if password is valid 
        const token =jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message: 'User signed successfully',
            data: {
                token,
                user,
            }
        });

    } catch(error){

        //forwarding error to error hadelling middleware
        next(error);
    }
}

/*
export const signout =async(req, res, next)=>{
    //Implements signout logic here
}*/