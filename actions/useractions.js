"use server"

import Razorpay from "razorpay"
import Payment from "@/models/payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    var instance = new Razorpay(
        { key_id: process.env.NEXT_PUBLIC_KEY_ID,
         key_secret: process.env.KEY_SECRET })



    let options ={
        amount : Number.parseInt(amount),
        currency : "INR",
    }

    let x = await instance.orders.create(options)

    //Create an payment object which show a pending payment in the database
    await Payment.create({
        oid: x.id,
        amount: amount/100,
        to_user: to_username,
        name : paymentform.name,
        message : paymentform.message
    })
    return x
}


//Fetch all the user 
export const fetchuser = async (username) =>{
    await connectDb()
    let u = await User.findOne({username : username})
    let user = u.toObject({flattenObjectsIds : true})
    return user
} 

// Fetch all the payments
export const fetchpayments = async (username) =>{
    await connectDb()
    // Find all the payments sorted by decresing order and flattening them
    let p = await Payment.find({to_user: username, done:true}).sort({amount: -1}).lean();
    return p 
}


// Request to Update the user Profile
export const updateProfile = async (data,oldusername) =>{
    await connectDb()
    let ndata = Object.fromEntries(data)

    //Check if the username us being Updated , Check if username is available
    if(oldusername !== ndata.username){
    let u = await User.findOne({username : ndata.username})
        if(u){
            return {error : "User name already Exists!!"}
        }
    }
    await User.updateOne({email: ndata.email},ndata)
}