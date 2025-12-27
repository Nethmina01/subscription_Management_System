import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
const userRouter = Router();

//GET/users->get all users
// GET/users/:id -> get all users by id

userRouter.get('/users', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/users', (req, res)=>res.send({title:'Create new user'}));

userRouter.put('/id:', (req, res)=>res.send({title:'Update a user'})); 

userRouter.delete('/id:', (req, res)=>res.send({title:'Delete a User'}));

export default userRouter;