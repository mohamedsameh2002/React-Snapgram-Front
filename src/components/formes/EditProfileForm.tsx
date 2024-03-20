import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditProfileValidation } from "@/lib/validation"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { useUpdateUserProfiel } from "@/lib/react-query/QueriesAMut"
import { GoPencil } from "react-icons/go";
import { openEditor } from "react-profile";
import "react-profile/themes/dark.min.css";
import { useDispatch } from "react-redux"
import { getUserInfo } from "@/redux/slices/AuthSlice"


export default function EditProfileForm({ userData }) {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const { mutate ,isSuccess} = useUpdateUserProfiel()
    const [newImage, setNewImage] = useState(null)
    const [newFile, setNewFile] = useState(null)
    const form = useForm<z.infer<typeof EditProfileValidation>>({
        resolver: zodResolver(EditProfileValidation),
        defaultValues: {
            name: userData.name,
            image: [],
            username: userData.username,
            email: userData.email,
            Bio: userData.Bio ? userData.Bio : 'The machine gun does not run out',
        },
    })

    function onSubmit(values: z.infer<typeof EditProfileValidation>) {
        values['image'] = newFile
        mutate(values)

    }
    useEffect(()=>{
        if (isSuccess) {
            const accessToken=JSON.parse(localStorage['jwt']).access
            dispatch(getUserInfo(accessToken))
            navigate(`/profile/${userData.username}`)
            toast.success("Your profile has been updated successfully")
            
        }
    },[isSuccess])
    async function getUploadImage(e) {
        const result = await openEditor({ src: e.target.files[0]  ,cropOptions:{maxHeight:400,maxWidth:400}});
        const dataURL = result.editedImage?.getDataURL();
        setNewImage(dataURL)
        const blob = await fetch(dataURL).then(response => response.blob());
        const randName=Math.floor(Math.random() * 1000000000)
        const file = new File([blob], `${randName}.png`, { type: 'image/jpeg' });
        setNewFile(file)

    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-9  max-w-5x1">

                <div className="flex-center">
                    <label htmlFor="image" className="cursor-pointer relative">
                        <img src={newImage ? newImage : userData.image} className=" rounded-full w-72 h-72" alt="change-image" />
                        <span className=" bg-slate-700 absolute right-7 p-2 bottom-3 rounded-full">
                            <GoPencil size={40} className="text-slate-200" />
                        </span>
                    </label>
                </div>
                <input onChange={getUploadImage} accept="image/png, image/jpeg, iamge/jpg" className=" hidden" id="image" type="file" />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Uusername</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Bio</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Email</FormLabel>
                            <FormControl>
                                <Input type="emaill" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4 items-center">
                    <Button onClick={() => navigate(`/profile/${userData.username}`)} type="button" className="shad-button_dark_4">Cancel</Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
                </div>

            </form>
        </Form>
    )
}
