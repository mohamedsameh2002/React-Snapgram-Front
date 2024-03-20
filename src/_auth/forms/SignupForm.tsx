
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import Loader from "@/components/shared/Loader"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,}from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import {register} from "../../redux/slices/AuthSlice"
import {  toast } from 'react-toastify';
import { useEffect } from "react"







export default function SignupForm() {
  const dispatch=useDispatch()
  const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
    },
  })

  
  function onSubmit(values: z.infer<typeof SignupValidation>):void {
    //Create a user
    const newUser=dispatch(register(values))
    // toast('good work!')

  }

  useEffect(()=>{
    if (isError){
      toast.error(message)
    }
    if (isSuccess || user){
      toast.success("An activation email has been sent to your email,Check your email")
    }
  },[isError,isSuccess,user])



  return (
    <Form {...form}>
      <div className="sm:w-240 flex flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className=" h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Snapgram, Please enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
            ):"Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">Already have an account?
            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
