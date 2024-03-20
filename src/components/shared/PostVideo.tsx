import { BACKEND_DOMIN } from '@/redux/slices/AuthSlice'
import React from 'react'

export default function PostVideo({video}) {
  return (
    <>
    <video controls src={BACKEND_DOMIN+video} className='post-card_img'></video>
    </>
  )
}
