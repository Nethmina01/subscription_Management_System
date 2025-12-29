import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

//GET/users->get all users
// GET/users/:id -> get all users by id

userRouter.get('/', getUsers);

//add authorization middleware to add access level 
userRouter.get('/:id', authorize, getUser);

userRouter.post('/users', (req, res)=>res.send({title:'Create new user'}));

userRouter.put('/id:', (req, res)=>res.send({title:'Update a user'})); 

userRouter.delete('/id:', (req, res)=>res.send({title:'Delete a User'}));

export default userRouter;