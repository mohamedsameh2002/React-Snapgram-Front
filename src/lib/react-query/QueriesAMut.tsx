import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { FetchPosts, CreatePost, likeDis, saveCancel, getPostDetails, updatePost, deletePost, getAllUsers, createFollow, getProfileData, updateUserProfiel, updatePassword } from './services'
import { toast } from 'react-toastify';



export function useGetPosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: FetchPosts,
        refetchOnWindowFocus: false,
    })
}


export function useCreatePost() {
    return useMutation({
        mutationFn: (postData) => CreatePost(postData),
        onMutate() {
            console.log('mutate');

        },
        onError: () => {
            console.log('error');

        },
        onSuccess: () => {
            console.log('success');

        },
        onSettled: () => {
            console.log('Settled');

        }
    })
}

export function useLikeDis() {
    return useMutation({
        mutationFn: (postId) => likeDis(postId),
        onError: () => {
            console.log('error');

        },
    })
}
export function useSaveCancel() {
    return useMutation({
        mutationFn: (postId) => saveCancel(postId),
        onError: () => {
            console.log('error');

        },
    })
}


export function useGetPostDetail(postId) {
    return useQuery({
        queryKey: ['psotDetails', postId],
        queryFn: () => getPostDetails(postId),
        refetchOnWindowFocus: false,
    })
}


export function useUpdatePost() {
    return useMutation({
        mutationFn: (updateData) => updatePost(updateData),
        onError: () => {
            console.log('error');

        },
    })
}
export function useDeletePost() {
    return useMutation({
        mutationFn: (postId) => deletePost(postId),
        onError: () => {
            console.log('error');

        },
    })
}


export function useGetAllUsers() {
    return useQuery({
        queryKey: ['Allusers'],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
    })
}

export function useCreateFollow() {
    return useMutation({
        mutationFn: (user) => createFollow(user),
        onError: () => {
            console.log('error');

        },
    })
}


export function useGetProfileData(username) {
    return useQuery({
        queryKey: ['profileData', username],
        queryFn: () => getProfileData(username),
        refetchOnWindowFocus: false,
    })
}


export function useUpdateUserProfiel() {
    return useMutation({
        mutationFn: (newData) => updateUserProfiel(newData),
        onError: () => {
            console.log('error');

        },
    })
}


export function useUpdatePassword() {
    return useMutation({
        mutationFn: (password) => updatePassword(password),
        onError: (e) => {
            if (e.response.data.current_password) {

                toast.error(`${e.response.data.current_password}`)
            } else if (e.response.data.non_field_errors) {
                toast.error(`${e.response.data.non_field_errors}`)

            }
        },
    })
}