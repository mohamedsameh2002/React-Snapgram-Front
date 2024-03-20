import FollowCard from '@/components/shared/FollowCard';
import Loader from '@/components/shared/Loader'
import { useGetAllUsers, useGetProfileData } from '@/lib/react-query/QueriesAMut'

export default function AllUsers({userInfo}) {
  const { data:allUsers, isSuccess:donGtAllUsers } = useGetAllUsers() 
  const {data,isSuccess}=useGetProfileData(userInfo.username)
  const following=data?.data.following.map((el)=>el.username)
  return (
    <div className='p-10 w-full flex felx flex-col overflow-y-scroll custom-scrollbar h-screen '>
      <h2 className='h3-bold md:h2-bold w-full px-10 text-center'>All Users</h2>
      <ul className='flex mt-8 flex-col gap-8 w-full md:flex-row flex-wrap justify-center items-center'>
        {donGtAllUsers && isSuccess ? (allUsers?.data.map((user) => (
          <FollowCard key={user.username} user={user} following={following}></FollowCard>
        ))) : (<Loader></Loader>)}

      </ul>
    </div>
  )
}
