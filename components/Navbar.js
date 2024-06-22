"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  // if(session){
  //   const router = useRouter()
  //   router.push("/dashboard")
  // }

  return (
    <>
    

    <nav className='bg-gray-900 text-white flex justify-between items-center h-16 px-4'>
      <div className="logo font-bold flex justify-center items-center gap-3 text-2xl">
        <span>
          <img className="mix-blend-mode bg-transparent rounded-xl" width={35} src="./logo.gif" alt="" />
        </span>
        <div className='text-center'>
      <Link href={"/"}>
        <span className="styled-link font-abc">GetMeaChai</span>
      </Link>
    </div>
      </div>

      <div className='relative '>
        {session && (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={()=>
                {setTimeout(() => {
                  
                  setShowDropdown(false)
                }, 300);}}
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div id="dropdownHover" className={`z-10 ${showDropdown ? "" : "hidden"} absolute w-38 left-[250px]  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
               
                <li>
                  <Link href="#" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </Link>
        )}

        {session && (
          <button
            onClick={() =>  signOut() }
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">LogOut</button>
        )}
      </div>
    </nav>
    </>
  )
}

export default Navbar
