import AuthLayout from './_auth/AuthLayout'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import RootLayout from './_root/RootLayout'
import './globals.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllUsers, CreatePost, EditPost, Explor, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getUserInfo, reset } from './redux/slices/AuthSlice'




export default function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isSuccess}=useSelector((state)=>state.auth)
  useEffect(()=>{
    if (localStorage['jwt']) {
      const accessToken=JSON.parse(localStorage['jwt']).access
      
      dispatch(getUserInfo(accessToken))
    }
    
  },[isSuccess])
  const { userInfo ,isError,isLoading} = useSelector((state) => state.auth) 

  useEffect(()=>{
    if (!userInfo && isError && !isLoading) {
      dispatch(reset())
      navigate('/sign-in')
      toast.error('Please log in')
    }
  },[isError,isLoading,userInfo])
  
  return (
    <div className='dar00k'>
      <main className='flex h-screen dark:bg-black'>
        <Routes>
          {/* public routes  */}
          <Route element={<AuthLayout></AuthLayout>}>
            <Route path='/sign-in' element={<SigninForm></SigninForm>}></Route>
            <Route path='/sign-up' element={<SignupForm></SignupForm>}></Route>
          </Route>

          {/* private routes  */}
          <Route element={<RootLayout></RootLayout>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/explore' element={<Explor></Explor>}></Route>
            <Route path='/saved' element={<Saved></Saved>}></Route>
            <Route path='/all-users' element={userInfo && <AllUsers userInfo={userInfo}></AllUsers>}></Route>
            <Route path='/create-post' element={<CreatePost></CreatePost>}></Route>
            <Route path='/update-post/:id' element={<EditPost></EditPost>}></Route>
            <Route path='/posts/:id' element={<PostDetails></PostDetails>}></Route>
            <Route path='/profile/:username/*' element={userInfo && <Profile userInfo={userInfo}></Profile>}></Route>
            <Route path='/update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
          </Route>
        </Routes>
      </main>
      <ToastContainer></ToastContainer>
    </div>

  )
}

