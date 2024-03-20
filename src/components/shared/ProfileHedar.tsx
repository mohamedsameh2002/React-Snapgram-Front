import { useCreateFollow } from '@/lib/react-query/QueriesAMut'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'

export default function ProfileHedar({ username,myData,data }) {
    const following_list = myData?.data.following?.map((el) => el.username)
    const [iAmFollowing,setIAmFollowing] = useState(following_list?.includes(username))
    const { mutate, isPending } = useCreateFollow()
    const [followers,setFollwers]=useState(data?.data.followers.length)
    const handelFollowClick = () => {
        mutate({ 'username': username })
        iAmFollowing ? setIAmFollowing(false) : setIAmFollowing(true)
        iAmFollowing ? setFollwers(followers-1) : setFollwers(followers+1)
        
    }
    const { isSuccess, userInfo } = useSelector((state) => state.auth)
    return (
        <>
            <div className='flex flex-col gap-6 md:flex-row items-center '>
                <img src={data?.data.data.image ? BACKEND_DOMIN+data?.data.data.image : '/assets/icons/profile-placeholder.svg'} alt="priphile" className=' rounded-full w-36 h-36 ' />
                <div className='flex flex-col justify-start items-center md:items-start'>
                    <h1 className='font-bold text-3xl leading-[140%]'>{data?.data.data.name}</h1>
                    <p className='text-sm text-light-3'>@{data?.data.data.username}</p>
                    <p className='my-4'>"{data?.data.data.Bio?data?.data.data.Bio:'The machine gun does not run out'}"</p>
                    <div className='flex gap-6 w-full'>
                        <div className='flex items-center gap-2 w-1/3'>
                            <span className='text-primary-500 font-bold text-lg'>{data?.data.posts_count}</span>
                            <h2 className=' font-semibold'>Posts</h2>
                        </div>
                        <div className='flex items-center gap-2 w-1/3'>
                            <span className='text-primary-500 font-bold text-lg'>{followers}</span>
                            <h2 className=' font-semibold'>Followers</h2>
                        </div>
                        <div className='flex items-center gap-2 w-1/3'>
                            <span className='text-primary-500 font-bold text-lg'>{data?.data.following.length}</span>
                            <h2 className=' font-semibold'>Following</h2>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex mt-4 items-start h-full'>

                {isSuccess && <>
                    {username === userInfo.username ? (
                        <Link to={`/update-profile/`} className='flex gap-1 bg-gray-800 p-2 rounded-lg'>
                            <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                            <p className='text-sm font-medium'>Edit Profile</p>
                        </Link>
                    ) : (
                        <Button className={`shad-button_${iAmFollowing ? 'dark_4' : 'primary'}`} type="button" onClick={handelFollowClick}>
                            {isPending ? (
                                <div className=" flex-center gap-2">
                                    <Loader></Loader>
                                </div>
                            ) : iAmFollowing ? "Unfollow" : 'Follow'}
                        </Button>
                    )}

                </>}
            </div>
        </>
    )
}
