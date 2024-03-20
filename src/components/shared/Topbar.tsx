import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { logout, reset } from '@/redux/slices/AuthSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

export default function Topbar({userInfo}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handelLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/sign-in')
    toast.success("You have been successfully logged out")
  }
  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to={"/"} className='flex gap-3 items-center'>
          <img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
        </Link>
        <div className='flex gap-4'>
          <Button variant={'ghost'} className='shad-button_ghost' onClick={handelLogout}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${userInfo?.username}`}>
            <img src={userInfo?.image ?userInfo.image: '/assets/icons/profile-placeholder.svg'} alt="profle" className='h-8 w-8 rounded-full mt-2' />
          </Link>
        </div>
      </div>
    </section>
  )
}
