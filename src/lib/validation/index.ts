import * as z from "zod"


export const SignupValidation = z.object({
  name:z.string().min(2,{message:'Too Short'}),
    username: z.string().min(2,{message:'Too Short'}),
    email: z.string().email(),
    password: z.string().min(8,{message:'Password must be at least 8 characters.'}),
  })
export const LoginValidation = z.object({
    username: z.string().min(2,{message:'Too Short'}),
    password: z.string(),
  })

export const PostValidation = z.object({
    caption:z.string().min(5).max(2200),
    file:z.custom<File[]>(),
    location:z.string().min(2).max(100),
  })

export const EditProfileValidation = z.object({
  name:z.string().min(2).max(15),
  username:z.string().min(2).max(10),
  email:z.string().email().min(2).max(200),
  image:z.custom<File[]>(),
  Bio:z.string().min(0).max(100),
  })

export const UpdatePasswordValidation = z.object({
  current_password:z.string(),
  new_password:z.string().min(8,{message:'Password must be at least 8 characters.'}),
  re_new_password:z.string().min(8,{message:'Password must be at least 8 characters.'}),
  })