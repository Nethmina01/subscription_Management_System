import { Router } from "express";

const subscriptionRouter =Router();

subscriptionRouter.get('/', (req, res)=>res.send({title:'Get all subscriptions'}));

subscriptionRouter.get('/:id', (req, res)=>res.send({title:'Get subscription details'}));

subscriptionRouter.post('/', (req, res)=>res.send({title:'Create a subscription'}));

subscriptionRouter.put('/:id', (req, res)=>res.send({title:'update a subscriptions'}));

subscriptionRouter.delete('/:id', (req, res)=>res.send({title:'Delete a subscription'}));

subscriptionRouter.get('/user/:id', (req, res)=>res.send({title:'Get all user subscriptions'}));

subscriptionRouter.put('/user/:id', (req, res)=>res.send({title:'Cancel subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res)=>res.send({title:'Get upcomming renewals'}));

export default subscriptionRouter;