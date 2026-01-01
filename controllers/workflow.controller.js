import dayjs from 'dayjs';
//import upstash workflow
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} =require('@upstash/workflow/express');

import Subscription from '../models/subscription.model.js';

const REMINDERS =[7,5,2,1];

export const sendReminders = serve(async(context)=>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    //checking if the subscription active or not
    if(!subscription || subscription.status!== 'active' ) return;

    //calculating the renewal date
    const renewalDate = dayjs(subscription.renewalDate);

    //checking if the subscription date in the past
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}.Stopping workflow.`);
        return;
    }


    //daysBefore is a number, coming from your REMINDERS array and it describe describing how many days before renewal you want to remind the user.
    for(const daysBefore of REMINDERS){

        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        //when to put the reminder to sleep 
        if(reminderDate.isAfter(dayjs())){
            //schedule reminder
            await sleepUntilReminder(context, `Reminder ${daysBefore}`, reminderDate);
        }
        //when to trigger the reminder
        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

//fetching subscriptions (First this will do)
/*
const fetchSubscription = async(context, subscriptionId)=>{
    return await context.run('get subscription', ()=>{
        return Subscription.findById(subscriptionId).populate('user', 'name email').lean();
    })
}*/

//fetching subscription using ChatGpt code
const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        const subscription = await Subscription
            .findById(subscriptionId)
            .populate('user', 'name email')
            .lean();

        return subscription;
    });
};



const sleepUntilReminder = async(context, label, date )=>{
    console.log(`Sleep until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder =async(context, label)=>{
    return await context.run(label, ()=>{
        console.log(`Triggering ${label} reminder`);

        //send email, sms, Push notification
    })
}