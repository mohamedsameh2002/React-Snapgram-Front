import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { logout, reset } from "../../redux/slices/AuthSlice"
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function LeftSidebar(useInfo) {
  const data = useInfo['userInfo'];
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handelLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/sign-in')
    toast.success("You have been successfully logged out")
  }

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to={"/"} className='flex gap-3 items-center'>
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>


        <>
          {data ?
            <Link to={`profile/${data.username}`} className='flex gap-3 items-center'>
              <img src={data.image ? data.image: '/assets/icons/profile-placeholder.svg'} alt="profle" className='h-14 w-14 rounded-full' />
              <div className='flex flex-col'>
                <p className='body-bold'>{data.name}</p>
                <p className='small-regular text-light-3'>@{data.username}</p>
              </div>
            </Link>

            : <Link to={"/sign-in"} className='flex gap-3 items-center'>
              <div className='flex flex-col'>
                <p className='body-bold'>Log in</p>
                <p className='small-regular text-light-3'>now</p>
              </div>
            </Link>}
        </>


        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {


            const isActive = pathname === link.route
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <NavLink to={link.route} className={'flex gap-4 items-center p-4'} >
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {link.label}
                </NavLink>
              </li>
            )


          })}
        </ul>
      </div>
      <Button variant={'ghost'} className='shad-button_ghost' onClick={handelLogout}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  )
}
