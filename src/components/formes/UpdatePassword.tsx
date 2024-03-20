import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdatePasswordValidation } from "@/lib/validation"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useUpdatePassword } from "@/lib/react-query/QueriesAMut"
import { toast } from "react-toastify"

export default function UpdatePassword({userData}) {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const {mutate,isSuccess}=useUpdatePassword()
    const form = useForm<z.infer<typeof UpdatePasswordValidation>>({
        resolver: zodResolver(UpdatePasswordValidation),
        defaultValues: {
            current_password: '',
            new_password: '',
            re_new_password: '',
            
        },
    })

    function onSubmit(values: z.infer<typeof UpdatePasswordValidation>) {
        mutate(values)
    }

    useEffect(()=>{
        if (isSuccess) {
            navigate(`/profile/${userData.username}`)
            toast.success("Your password has been updated successfully")
            
        }
        console.log();
        
    },[isSuccess])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-9  max-w-5x1">

                <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Old Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                asdf
                <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">New Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="re_new_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-4 items-center">
                    <Button type="submit" className="shad-button_primary whitespace-nowrap">Update</Button>
                </div>
            </form>
        </Form>
    )
}
