import GridPostList from '@/components/shared/GridPostList'
import SearchResult from '@/components/shared/SearchResult'
import { Input } from '@/components/ui/input'
import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/shared/Loader'
import { useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce';

export default function Explor() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [value] = useDebounce(searchValue, 1000);

  const [exploreData, setexploreData] = useState([])
  const getInfintPosts = async () => {
    const GET_INFINT_POSTS = `${BACKEND_DOMIN}/api/v1/posts/search/?page=${page}&q=${value}`
    // `${BACKEND_DOMIN}/api/v1/posts/explore/?page=${page}`
    const config = { "Authorization": `Bearer ${JSON.parse(localStorage['jwt']).access}` }
    const res = await axios.get(GET_INFINT_POSTS, { headers: config })
    setexploreData([...exploreData].concat(res.data.results))
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
  });

  useEffect(() => {
    getInfintPosts()
    setexploreData([])
    setPage(1)
  }, [value])
  
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])



  const { postSaved } = useSelector((state) => state.browsing)
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Input type='text' placeholder='Search' className='explore-search' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src="/assets/icons/filter.svg" width={20} height={20} alt="fleter" />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {postSaved ? (<GridPostList posts={exploreData}></GridPostList>) : (<Loader></Loader>)}
      </div>
      {exploreData.length === 0 && <p className='text-light-4 mt-10 text-xl text-center w-full'>No results found</p>}
      {hasNextPage && <span className='p-28 w-full h-2 flex justify-center items-center' ref={ref}><Loader></Loader></span>}
    </div>
  )
}
