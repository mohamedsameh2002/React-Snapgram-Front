import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader';
import ProfileHedar from '@/components/shared/ProfileHedar';
import { useGetProfileData } from '@/lib/react-query/QueriesAMut';
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom'

export default function Profile({userInfo}) {
  const { username } = useParams()
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1)
  const [profilePosts, setprofilePosts] = useState([])
  const getInfintPosts = async () => {
    const GET_INFINT_POSTS = `${BACKEND_DOMIN}/api/v1/posts/profileposts/?page=${page}`
    const config = { "Authorization": `Bearer ${JSON.parse(localStorage['jwt']).access}` }
    const res = await axios.get(GET_INFINT_POSTS, {
      headers: config,
      params: { 'username': username },
    })
    setprofilePosts([...profilePosts].concat(res.data.results))
    setPage(page + 1)
    
    return res
  }


  const {
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['infintPosts'],
    queryFn: getInfintPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next) {
        return page
      }
      return null;
    },
    enabled:true
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  const { postSaved } = useSelector((state) => state.browsing)
  const { data: myData,isSuccess } = useGetProfileData(userInfo.username)
  const { data,isSuccess:successData } = useGetProfileData(username)
  
  return (
    <div className='flex w-full flex-col p-10 overflow-scroll custom-scrollbar'>
      <div className='flex flex-col md:flex-row justify-around w-full items-center'>
        {isSuccess && successData?<ProfileHedar
          username={username}
          myData={myData} 
          data={data}
          ></ProfileHedar>:<Loader></Loader>}
      </div>
      <hr className='border border-gray-700 my-8' />
      {profilePosts.length !== 0 ?(
      <div className='mt-8 flex flex-col justify-center items-center'>
        {postSaved ? (<GridPostList posts={profilePosts}></GridPostList>) : (<Loader></Loader>)}
        {hasNextPage && <span className='p-8 w-full h-2 flex justify-center items-center' ref={ref}><Loader></Loader></span>}
      </div>
      ):(
        <div className='flex-center mt-20 gap-1 w-full flex-col ' >
          <img src="/assets/icons/5464135.png" alt="" width={110} height={110} />
          <h2 className='w-fit font-bold text-xl text-gray-200 text-center'>There are no posts to display</h2>
        </div>
      )}
    </div>
  )
}
