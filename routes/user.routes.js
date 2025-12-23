import { Router } from "express";
const userRouter = Router();

//GET/users->get all users
// GET/users/:id -> get all users by id

userRouter.get('/users', (req, res)=>res.send({title:'Get all Users'}));

userRouter.get('/:id', (req, res)=>res.send({title:'Get user details'}));

userRouter.post('/users', (req, res)=>res.send({title:'Create new user'}));

userRouter.put('/id:', (req, res)=>res.send({title:'Update a user'})); 

userRouter.delete('/id:', (req, res)=>res.send({title:'Delete a User'}));

export default userRouter;