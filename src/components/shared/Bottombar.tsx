import { bottombarLinks } from '@/constants'
import { INavLink } from '@/types'
import { Link, useLocation } from 'react-router-dom'

export default function Bottombar() {
  const { pathname } = useLocation()
  return (
    <div className='bottom-bar'>
      {bottombarLinks.map((link) => {


        const isActive = pathname === link.route
        return (
            <Link to={link.route} key={link.label} className={`${isActive && 'bg-primary-500 rounded-md'} flex-start flex-col gap-1 p-2 transition`} >
              <img width={16} height={16} src={link.imgURL} alt={link.label} className={`${isActive && 'invert-white'}`} />
              <p className='tiny-medium text-light-2'>{link.label}</p>
            </Link>
        )


      })}
    </div>
  )
}
