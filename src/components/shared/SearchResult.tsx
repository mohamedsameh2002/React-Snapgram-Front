import Loader from './Loader'
import GridPostList from './GridPostList'

export default function SearchResult({searchPosts}) {
  if (searchPosts && searchPosts.length > 0) {
    return(
      <GridPostList posts={searchPosts}></GridPostList>
    )
  }
  return (
    <p className='text-light-4 mt-10 text-xl text-center w-full'>No results found</p>
  )
}
