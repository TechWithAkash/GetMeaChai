"use client"
import React from 'react'
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const PaymentPage = ({ username }) => {
    // const { data:session } = useSession()

    const [paymentform, setPaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()

    const router = useRouter();
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
      if(searchParams.get("paymentdone") == 'true'){
        toast('Payment has been made Successfully🥳', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });

            // router.push(`/dashboard/${username}`)
            router.push(`/${username}`)

            
      }
    }, [])
    

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)


    }

    const pay = async (amount) => {
        // Get the Order ID
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            // "key": process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url    ": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
            {/* <button id="rzp-button1">Pay</button> */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover  bg-red-500 relative'>
                <img src={currentUser.coverpic ? currentUser.coverpic : "/cover.jpg"} alt="" />

                <div className="profile absolute -bottom-16  right-[47%] border-2 rounded-full border-white size-32 overflow-hidden">
                    <img width={100} className='rounded-full size-32 object-cover ' src={currentUser.profilepic ? currentUser.profilepic : "/user.png"} alt="" srcSet="" />
                </div>
            </div>

            {/* john profilepic : https://c10.patreonusercontent.com/4/patreon-media/p/campaign/5206435/06dccd62e4f6492eb83eb7d7ec4ba71e/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/2.jpg?token-time=1719964800&token-hash=brXH6gsPCuzpVWFo_nuGLjofxA69EEZ2tBpMrjX3JcY%3D 
           
           jonh coverpic :https://c10.patreonusercontent.com/4/patreon-media/p/campaign/5206435/040f24da514f406aad5ae11360d11ad3/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/4.png?token-time=1720051200&token-hash=V5snq_Jc9fRxj3xRnWzr_WgpVKOUpEJjh11uCPrGNiY%3D*/}

            <div className="info flex flex-col justify-center items-center my-20 gap-2">
                <div className=' font-semibold text-2xl'>
                    @{username}

                </div>

                <div className='text-xs text-slate-500'>Is creating video game guitar covers.</div>
                <div className='text-xs text-slate-500'>1,520 paid members. 325 posts</div>
                <div className='font-bold text-xs  bg-red-950 px-10 py-2 rounded-lg hover:bg-red-900 cursor-pointer'>Become a member
                </div>


                <div className="payment flex gap-3 w-[80%] mt-10">
                    <div className="supporters w-1/2  bg-slate-900 rounded-lg p-10 text-white">
                        <h2 className='font-bold text-white  text-2xl my-5'>Supporters</h2>
                        {payments.length === 0 && <li className='text-xl text-red-400'>No payments Yet!!</li>}
                        <ul className='mx-5'>
                            {payments.map((p, i) => {
                                return <li className='my-2 flex  gap-2 '>
                                    <img className='w-[30px] h-[30px]' src="user.png" alt="" srcSet="" />
                                    <span className='text-sm'>{p.name} donated <span className='font-bold'>₹{p.amount}</span> <span>With these messages "{p.message}"</span>
                                    </span>
                                </li>
                            })}


                        </ul>
                    </div>
                    <div className=' w-1/2  bg-slate-900 rounded-lg p-10 text-white'>
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            <input onChange={handleChange} value={paymentform.name} name="name" type="text" className='w-full p-3 rounded-lg bg-slate-800 ' placeholder='Enter Your name' />

                            <input onChange={handleChange} value={paymentform.message} name="message" type="text" className='w-full p-3 rounded-lg bg-slate-800 ' placeholder='Enter Your Message' />

                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800 ' placeholder='Enter a amount to pay' />

                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  disabled:slate-600 disabled:from-blue-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>Pay</button>
                        </div>


                        <div className=' flex gap-2 mt-5'>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => pay(2000)} >20₹</button>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700    " onClick={() => pay(5000)} >50₹</button>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => pay(1000)}   > 10₹</button>
                          



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage