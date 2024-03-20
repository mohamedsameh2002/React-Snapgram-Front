import {  multiFormatDateString } from "@/lib/utils";
import { BACKEND_DOMIN } from "@/redux/slices/AuthSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import PostVideo from "./PostVideo";


export default function PostCard({ post }) {

  function checkIfImage(filePath) {
    const extension = filePath?.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
    const videoExtensions = ['jpg','png','svg'];
    if (videoExtensions.includes(extension)) {
        return true;
    } else {
        return false;
    }
}
  
  const {userInfo}=useSelector((state)=>state.auth)
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.publisher.username}`}>
            <img src={post?.publisher?.image ? BACKEND_DOMIN+post?.publisher?.image:'/assets/images/profile.png'} alt="puplsher" className=" rounded-full w-12 h-12" />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              <Link to={`/profile/${post.publisher.username}`}>
              {post.publisher.name}
              </Link>
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(post.created_at)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link to={`/update-post/${post.id}`}>
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} className={`${post.publisher.username !== userInfo?.username && `hidden`} `} />
        </Link>
      </div>

      <Link to={`/posts/${post.id}`}>
        <div className="samll-medium lg:base-medium py-5">
          <p>{post.caption}</p>
        </div>
        {checkIfImage(post.file) ?<img src={`${BACKEND_DOMIN}${post.file}`} alt="postimage" className="post-card_img" />:(
          <PostVideo video={post.file}></PostVideo>
        )}
      </Link>
      <PostStats post={post} userUsernaem={userInfo?.username}></PostStats>
    </div>
  )
}
