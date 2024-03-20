import { useGetAllUsers, useGetProfileData } from '@/lib/react-query/QueriesAMut'
import FollowCard from './FollowCard'
import Loader from './Loader'
export default function RightSidbar({userInfo}) {

  const { data:allUsers, isSuccess:donGtAllUsers } = useGetAllUsers()
  const {data,isSuccess}=useGetProfileData(userInfo.username)
    const following=data?.data.following.map((el)=>el.username)
  return (
    <div className=' hidden overflow-y-scroll h-screen custom-scrollbar lg:flex flex-col min-w-[270px] px-6 py-12 '>
        <h2 className='w-full text-center font-semibold text-2xl'>Latest users</h2>
      <ul className='flex mt-8 flex-col gap-2 max-w-80 md:flex-row flex-wrap justify-center items-center'>
        {donGtAllUsers && isSuccess ? (allUsers?.data.map((user) => (
          <FollowCard key={user.username} user={user} following={following}></FollowCard>
        ))) : (<Loader></Loader>)}

      </ul>
    </div>
  )
}
