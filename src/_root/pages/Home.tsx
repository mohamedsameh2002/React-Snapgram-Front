import Loader from '@/components/shared/Loader'
import {useGetPosts} from '../../lib/react-query/QueriesAMut'
import PostCard from '@/components/shared/PostCard'
import { useSelector } from 'react-redux'
import RightSidbar from '@/components/shared/RightSidbar'



export default function Home() {

  const thPosts=useGetPosts()
  const { userInfo } = useSelector((state) => state.auth) 
  const {postSaved}=useSelector((state)=>state.browsing)


  return (
    <div className='flex flex-1'>
      <div className='home-container'>
          <div className='home-posts'>
              <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
              {thPosts.isPending && !thPosts.data ?(
                <Loader></Loader>
              ):(
                <ul className='flex flex-col flex-1 gap-9 w-full'>

                  {postSaved?  thPosts.data?.data.map((post)=>(
                    <PostCard key={post.id} post={post}></PostCard>
                  )):(<Loader></Loader>)}
                </ul>
              )}
          </div>
      </div>
      {userInfo&&<RightSidbar userInfo={userInfo}></RightSidbar>}
    </div>
  )
}
