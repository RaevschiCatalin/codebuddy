"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {
  const isUserLoggedIn : boolean = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);


  return (
    <nav className='flex flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/logo_removed.png" width={33} height={33} alt="logo" />
        <p className='logo_text'>CodingBuddy</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            
            <Link href="/find-buddy"
            className='black_btn'>
              Get a buddy
            </Link>
            <Link href="/profile">
              <Image src="/assets/user.png" width={32} height={32} alt="user" className='rounded-full border-2 border-gray-700' />
            </Link>
          </div>
          
          ) : (
            <>
            <Link href="/signin">
            <button type='button' className='black_btn' >Sign Up</button>
            </Link>
            </>
          )}
      </div>
      <div className='sm:hidden flex gap-3 relative'>
        
            {isUserLoggedIn ? (
              <div className='flex w-full'>
                <button type='button' onClick={()=>setToggleDropdown((prev)=>!prev)}>
                <Image src="/assets/user.png" width={33} height={33} className='rounded-full border-2 border-gray-700' alt="user" />
                </button>
                {toggleDropdown && (
                  <div className='dropdown'>
                     <Link href="/"
                  className='dropdown_link'>
                    Home
                  </Link>
                    <Link 
                    href="/profile"
                    className='dropdown_link'
                    onClick={()=>setToggleDropdown(false)}>
                      Profile</Link>
                      <Link 
                    href="/find-buddy"
                    className='dropdown_link'
                    onClick={()=>setToggleDropdown(false)}>
                      Find a buddy</Link>
                      {/* <Link 
                    // href="/notifications"
                    // className='dropdown_link'
                    // onClick={()=>setToggleDropdown(false)}>
                    //   Notifications</Link> */}
                    <button 
                    type='button'
                    className='outline_btn  dropdown_link'
                    onClick={()=>{setToggleDropdown(false);signOut()}}>Sign Out</button>
                  </div>)}
              </div>
            ) : ( 
              <>
              <button type='button' className='black_btn' onClick={signIn}>
                <Link href="/signin">
                  Sign In
                </Link>
              </button>
            </>
            )
              }
        </div>
    </nav>
  )
}

export default Nav
