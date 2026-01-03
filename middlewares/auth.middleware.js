import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


import {JWT_SECRET } from '../config/env.js';

//someone is making a request GET user details -> authorize middleware -> verify token -> if valid -> next -> get user details

const authorize = async (req, res, next)=>{
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        
        //commented the if(!token) return res.status(401).json({message:'Unauthorized'}); and added below line ad added 
        //if(!token) return res.status(401).json({message:'Unauthorized'});
        if (req.method === 'OPTIONS') {
            return next();
        }



        const decoded =jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message:'Unauthorized'});

        // attaching the user requesting the data

        req.user =user;

        next();

    } catch(error){
        res.status(401).json({message:'Unauthorized', error: error.message });
    }
    
}
export default authorize;

