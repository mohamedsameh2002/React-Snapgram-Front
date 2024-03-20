import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

export default function AuthLayout() {
  const isAuthenticated=false
  return (
    <>
    {
      isAuthenticated?(
        <Navigate to={'/'}/>
      ):(
        <>
        <section className='flex flex-1 flex-col py-10 items-center justify-center'>
          <Outlet></Outlet>
        </section>
        <img className='hidden xl:block h-screen w-1/2 object-cover' src="../public/assets/images/side-img.svg" alt="side-img" />
        </>
      )
    }
    </>
  )
}
