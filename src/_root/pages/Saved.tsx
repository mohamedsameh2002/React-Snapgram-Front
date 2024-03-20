import GridPostList from '@/components/shared/GridPostList'
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/shared/Loader'
import { useSelector } from 'react-redux'

export default function Saved() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1)
  const [savedPosts, setsavedPosts] = useState([])
  const getInfintPosts = async () => {
    const GET_INFINT_POSTS = `${BACKEND_DOMIN}/api/v1/posts/saved-posts/?page=${page}`
    const config = { "Authorization": `Bearer ${JSON.parse(localStorage['jwt']).access}` }
    const res = await axios.get(GET_INFINT_POSTS, { headers: config })
    const savedPostsList=res.data.results.map((el)=>el.post)
    setsavedPosts([...savedPosts].concat(savedPostsList))
    setPage(page+1)
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
  });



  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  
  const {postSaved}=useSelector((state)=>state.browsing)
  return (
    <div className='explore-container'>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/save.svg" width={36} height={36} alt="add-post" className='invert-white' />
          <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
        </div>
        {postSaved ?(postSaved?.length !== 0?<GridPostList posts={savedPosts}></GridPostList>:<p className='text-light-4 mt-10 text-xl text-center w-full'>There are no saved posts</p>):(<Loader></Loader>)}
      </div>
      {hasNextPage && <span className='p-28 w-full h-2 flex justify-center items-center' ref={ref}><Loader></Loader></span>}
    </div>
  )
}
