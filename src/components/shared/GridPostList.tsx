import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'



export default function GridPostList({posts}) {
  const { userInfo } = useSelector((state) => state.auth)
  
  return (
    <>
        <ul className='grid-container'>
          {posts?.map((post)=>(
          <li key={post.id} className='relative min-w-80 h-80'>
            <Link to={`/posts/${post.id}`} className='grid-post_link'>
              <img src={post.file} alt="postimgae" className='h-full w-full object-cover' />
            </Link>
            <div className='grid-post_user'>
              <div className='flex items-center justify-start gap-2 flex-1'>
                <Link to={`/profile/${post.publisher.username}`} className='flex gap-2'>
                <img src={post.publisher.image ? post.publisher.image : '/assets/images/profile.png'} alt="publisher" className='h-8 w-8 rounded-full' />
                <p className='line-clamp-1'>{post.publisher.name}</p>
                </Link>
              </div>
              <PostStats post={post} userUsernaem={userInfo?.username}></PostStats>
            </div>
          </li>
          ))}
          </ul>
      </>
  )
}














// <ul className=' '>
//   {
//     posts.map(() => (
//
//     ))
//   }
// </ul>