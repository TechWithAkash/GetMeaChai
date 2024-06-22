"use client"
import React, { useState, useEffect, } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = ({ params }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {

        if (!session) {
            router.push("/login")
        }
        else{
            getData()
        
        }
        console.log(session)
    }, [router, session])

    const getData = async () =>{

        let u = await fetchuser(session.user.name)
        setform(u)

    }

    const handleChange = async (e) =>{
    setform({...form, [e.target.name]: e.target.value })
    console.log(form)
    }

    const handleSubmit = async (e) => {
      console.log(e)
        let a = await updateProfile(e,  session.user.name)
        toast('Profile Updated Successfully🥳', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

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
        <div className='flex flex-col justify-center items-center gap-3 my-5'>
            <div className='text-3xl font-bold'>
                <span>👋 Welcome to Your Dashboard !</span>
            </div>
            <form className="form flex justify-start flex-col gap-2 items-start w-[40%]" action={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={form.name?form.name:""}
                name='name' id='name' type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='Enter Your name' onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input value={form.email?form.email:""} 
                name='email' id='email' type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='Enter Your Email' onChange={handleChange} />
                <label htmlFor="username">Username</label>
                <input value={form.username?form.username:""} name='username' id='username' type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='Enter Your username' onChange={handleChange} />
                <label htmlFor="profilepic">Profile picture</label>
                <input value={form.profilepic?form.profilepic:""} name='profilepic' id='profilepic' type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='' onChange={handleChange} />
                <label htmlFor="coverpic">Cover Picture</label>
                <input value={form.coverpic?form.coverpic:""} name='coverpic' id='coverpic' type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='' onChange={handleChange} />
                <label htmlFor="razorpayid">RayzorPay Id</label>
        <input type="text" value={form.razorpayid?form.razorpayid:""} onChange={handleChange} name='razorpayid' id='razorpayid'  className='w-[100%] p-2 rounded-lg bg-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500
              ' placeholder='' />
<label htmlFor="razorpaysecret">RayzorPay Secret</label>
        <input type="text" value={form.razorpaysecret?form.razorpaysecret:""} onChange={handleChange} name='razorpaysecret' id='razorpaysecret'  className='w-[100%] p-2 rounded-lg bg-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500
              ' placeholder='' />


                {/* <label htmlFor="">RayzorPay Id</label>
                <input type="text" className='w-[100%] p-2 rounded-lg bg-slate-800 dark:focus:ring-blue-500 dark:focus:border-blue-500
              ' placeholder='' /> */}
                {/* <label htmlFor="">RayzorPay Secret</label>
                <input type="text" className='w-[100%] p-2 rounded-lg bg-slate-800
              ' placeholder='' /> */}

                <button type="submit" className="w-[100%] my-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Save</button>
            </form>
        </div>
        </>

    )
}

export default Dashboard;