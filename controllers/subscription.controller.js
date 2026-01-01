import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next)=>{
    try{
        const subscription = await Subscription.create(
            {
                ...req.body,
                user: req.user._id,
            }
        );

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            header: {
                "content-type": "application/json"
            },
            retries: 0,
        });
        console.log("Workflow started with ID:", workflowRunId);

        res.status(201).json({success:true, data:subscription, workflowRunId});
    }
    catch(e){
        next(e);
    }
}

//get all subscription created by user

export const getUserSubscriptions = async( req, res,next)=> {
    try{
        //Check if the user is the same as the one in the token
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the Owner of this account');
            error.status=401;
            throw error;
        }

        const subscriptions = await Subscription.find({user:req.params.id});
        //show the response as json and show all subscription data
        res.status(200).json({success:true, data:subscriptions});

    }
    catch (e){
        next(e);
    }
}
