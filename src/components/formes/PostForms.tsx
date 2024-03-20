
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { useCreatePost, useDeletePost, useUpdatePost } from "@/lib/react-query/QueriesAMut"
import { useEffect } from "react"
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"



export default function PostForms({post,action}) {
  const navigate = useNavigate();
  
  const createPost=useCreatePost()
  const updatePost=useUpdatePost()
  const deletePost=useDeletePost()
  
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post?post?.data?.caption:"",
      file:[],
      location:post? post?.data.location :"",
    },
  })


  function onSubmit(values: z.infer<typeof PostValidation>) {
    values['file']=values['file'][0]
    
    if (action === 'update') {
      values['post_id']=post.data?.id
      updatePost.mutate(values)
    }else{
      createPost.mutate(values)
    }
  }

  useEffect(()=>{
    if (updatePost.isSuccess) {
      navigate('/')
      toast.success('Your post has been updated successfully')
    }
    if (createPost.isSuccess) {
      navigate('/')
      toast.success('Published successfully')
    }
    if (deletePost.isSuccess) {
      navigate('/')
      toast.success('The post has been deleted')
    }


  },[updatePost.isSuccess,createPost.isSuccess,deletePost.isSuccess])



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-9  max-w-5x1">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Write..." {...field} className="shad-textarea custom-scrollbar" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add a file</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.data.file}
                ></FileUploader>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        
        {createPost.isPending?(
        <p>Loding...</p>
      ):(null)}
        <div className="flex justify-end gap-4 items-center">
          <Button onClick={()=>navigate('/')} type="button" className="shad-button_dark_4">Cancel</Button>
          {action ==='update' && <Button type="button" className="shad-button_dengars whitespace-nowrap" onClick={()=>deletePost.mutate({'post_id':post?.data.id})}>Delete</Button>}
          <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
