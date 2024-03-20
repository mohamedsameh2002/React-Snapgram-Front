
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import Loader from "@/components/shared/Loader"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,}from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginValidation } from "@/lib/validation"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import {login} from "../../redux/slices/AuthSlice"
import {  toast } from 'react-toastify';
import { useEffect } from "react"







export default function SigninForm() {
  const dispatch=useDispatch()
  const {userInfo,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  
  function onSubmit(values: z.infer<typeof LoginValidation>):void {
    //Create a user
    
    const RegisteredUser=dispatch(login(values))

  }

  useEffect(()=>{
    if (userInfo){
      navigate('/')
      toast.success("You have successfully logged in")
    }
  },[isError,isSuccess,userInfo])



  return (
    <Form {...form}>
      <div className="sm:w-240 flex flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Log in</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Log in to your account to see the latest updates!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="shad-button_primary " type="submit">
            {isLoading?(
              <div className=" flex-center gap-2">
                <Loader></Loader>Loding...
              </div>
            ):"Login"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Help?
            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Forgot password</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
