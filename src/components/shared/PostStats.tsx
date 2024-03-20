import {  useLikeDis, useSaveCancel } from "@/lib/react-query/QueriesAMut"
import { addPostToSave } from "@/redux/slices/browsing"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function PostStats({post,userUsernaem}) {
  //Like section
  const dispath=useDispatch()
  const {mutate:likDis}=useLikeDis()
  const {mutate:saveCancel}=useSaveCancel()
  const likesList=post.fans.map((fan)=>fan.username)
  const getLikesLength=likesList.length
  const [isLiked,setLikes]=useState(likesList.includes(userUsernaem))
  const [LikesLength,setLikesLength]=useState(getLikesLength)
  
  function handleLikeEvent() {
    if (isLiked) {
      setLikes(false)
      setLikesLength(LikesLength - 1)
    } else {
      setLikesLength(LikesLength + 1)
      setLikes(true)
    }
    likDis(post.id)
  }
  //Save section
  const {postSaved}=useSelector((state)=>state.browsing)
  
  const savePostsList=postSaved?.map((el)=>el?.post?.id)
  const [isPostSaved,setisPostSaved]=useState(savePostsList.includes(post.id))
  
  
    function handleSaveEvent(){
      isPostSaved?setisPostSaved(false):setisPostSaved(true)
      dispath(addPostToSave(post.id))
      saveCancel({'post_id':post.id})
  }
  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5'>
            <img src={`${isLiked ? '/assets/icons/liked.svg':'/assets/icons/like.svg' }`} alt="like" width={26} height={26} onClick={handleLikeEvent} className='cursor-pointer' />
            <p className='small-medium lg:base-medium'>{LikesLength}</p>
      </div>
      <div className='flex gap-2 '>
            <img src={`${isPostSaved?'/assets/icons/saved.svg':'/assets/icons/save.svg'}`} alt="save" width={26} height={26} onClick={handleSaveEvent} className='cursor-pointer' />
      </div>
    </div>
  )
}
