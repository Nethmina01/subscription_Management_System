import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
//import {getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

//GET/users->get all users
// GET/users/:id -> get all users by id


//userRouter.get('/', authorize, getUsers); #this will remove because this make Broken Access Control (Any User can see all users details)

// ✅ Get current logged-in user (BEST PRACTICE)
userRouter.get("/me", authorize, (req, res) => {
    const user = req.user.toObject();
    delete user.password;
    res.status(200).json({ success: true, data: user });
});

//add authorization middleware to add access level 
userRouter.get('/:id', authorize, getUser);

userRouter.post('/users', (req, res)=>res.send({title:'Create new user'}));

userRouter.put('/id:', (req, res)=>res.send({title:'Update a user'})); 

userRouter.delete('/id:', (req, res)=>res.send({title:'Delete a User'}));

export default userRouter;