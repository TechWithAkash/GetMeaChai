import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";


export const  POST = async (req) =>{
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    //Check if the razorpayId is already present in the server
    const p = await Payment.findOne({oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({success: false, message:"Order Id not found!!!"})
    }
    // verify  the Payment
    let xx = validatePaymentVerification({"order_id" :body.razorpay_order_id, "razorpay_payment_id" :body.razorpay_payment_id}, body.razorpay_signature, process.env.KEY_SECRET)

    if(xx){
        //update the payment status
       const updatedPayment =  await Payment.findOneAndUpdate({oid: body.razorpay_order_id }, {done: "true"},{new: true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success: false, message:"Payment Verification Failed"})
    }
    }
