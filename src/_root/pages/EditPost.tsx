import PostForms from "@/components/formes/PostForms";
import Loader from "@/components/shared/Loader";
import { useGetPostDetail } from "@/lib/react-query/QueriesAMut";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const {id}=useParams()
  const {data:post,isPending}=useGetPostDetail(id)
  
  
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/add-post.svg" width={36} height={36} alt="add-post" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        {isPending ? <Loader></Loader> :<PostForms action='update' post={post}></PostForms>}
        
      </div>
    </div>
  )
}
