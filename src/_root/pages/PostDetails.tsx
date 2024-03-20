import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { Button } from "@/components/ui/button"
import { useDeletePost, useGetPostDetail } from "@/lib/react-query/QueriesAMut"
import { multiFormatDateString } from "@/lib/utils"
import { BACKEND_DOMIN } from "@/redux/slices/AuthSlice"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"


export default function PostDetails() {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostDetail(id || '')
  const { userInfo } = useSelector((state) => state.auth)
  const deletePost=useDeletePost()
  const navigate = useNavigate();
  useEffect(()=>{
    if (deletePost.isSuccess) {
      navigate('/')
      toast.success('The post has been deleted')
    }

  },[deletePost.isSuccess])


  return (
    <div className="post_details-container">
      {isPending ? <Loader></Loader> : (
        <div className="post_details-card">
          <img src={BACKEND_DOMIN + post?.data?.file} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.data?.publisher?.username}`} className="flex items-center gap-3">
                <img src={post?.data?.publisher?.image ? BACKEND_DOMIN + post?.data?.publisher?.image : '/assets/images/profile.png'} alt="puplsher" className=" rounded-full w-8 lg:h-12 lg:w-12" />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.data?.publisher?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.data?.created_at)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.data?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center">
                <Link to={`/update-post/${post?.data?.id}`} className={`${post.data?.publisher.username !== userInfo?.username && `hidden`} `}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
                <Button className={`ghost_details-delete_btn ${post.data?.publisher.username !== userInfo?.username && `hidden`} `} onClick={()=>deletePost.mutate({'post_id':post?.data.id})} variant={'ghost'}>
                  <img src="/assets/icons/delete.svg" alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="felx flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.data?.caption}</p>
            </div>
            <div className="w-full">
                <PostStats post={post?.data} userUsernaem={userInfo?.username}></PostStats>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
