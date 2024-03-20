import { Button } from '../ui/button'
import Loader from './Loader'
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'
import { useCreateFollow } from '@/lib/react-query/QueriesAMut'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FollowCard({user,following}) {    
    const [iAmFollowing,setIAmFollowing]=useState(following?.includes(user?.username) )
    const {mutate,isPending}=useCreateFollow()
    const handelFollowClick=()=>{
        mutate({'username':user.username})
        iAmFollowing ? setIAmFollowing(false):setIAmFollowing(true)
        
    }
    return (
        <li key={user.username} className='w-full md:w-1/4 min-w-36 border border-gray-900 h-fit flex-center rounded-lg'>
            <div className='flex flex-col justify-center items-center gap-y-2 py-5'>
                <Link to={`/profile/${user.username}`}>
                <img src={user.image ? BACKEND_DOMIN + user.image : `/assets/icons/profile-placeholder.svg`} className='rounded-full w-20 h-20' alt="" />
                </Link>
                <Link to={`/profile/${user.username}`}>
                <h2 className='base-medium text-light-1 w-fit max-w-32 text-center '>{user.name}</h2>
                </Link>
                <p className='subtle-semibold lg:small-regular text-light-3'>@{user.username}</p>
                <Button className={`shad-button_${iAmFollowing?'dark_4':'primary'}`} type="button" onClick={handelFollowClick}>
                    {isPending ? (
                        <div className=" flex-center gap-2">
                            <Loader></Loader>
                        </div>
                    ) : iAmFollowing?"Unfollow":'Follow'}
                </Button>
            </div>
        </li>
    )
}
