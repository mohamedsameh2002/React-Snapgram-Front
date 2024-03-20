import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Bottombar from '@/components/shared/Bottombar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserSavedPosts } from '@/redux/slices/browsing'
import {  toast } from 'react-toastify';

export default function RootLayout() {
  const navigate=useNavigate()
  const {userInfo}=useSelector((state)=>state.auth)
  const {postSaved}=useSelector((state)=>state.browsing)
  const dispach=useDispatch()
  useEffect(()=>{
    if (!postSaved) {
      try {
        dispach(getUserSavedPosts(JSON.parse(localStorage['jwt']).access))
      } catch (error) {
        toast.error('Please register first')
        navigate('/sign-in')
        
      }
    }
  },[])
  
  return (
    <div className='w-full md:flex'>
      <Topbar userInfo={userInfo}></Topbar>
      <LeftSidebar userInfo={userInfo}></LeftSidebar>


      <section className='flex flex-1 h-full'>
        <Outlet></Outlet>
      </section>

      
      <Bottombar></Bottombar>
    </div>
  )
}
