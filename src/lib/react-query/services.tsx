import axios from 'axios'
import { BACKEND_DOMIN } from '../../redux/slices/AuthSlice'
const POSTS_URL = `${BACKEND_DOMIN}/api/v1/posts/`


export const FetchPosts=async ()=>{
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}}
        return await axios.get(POSTS_URL,config)
}
export const CreatePost=async (postData)=>{
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`,"Content-Type":'multipart/form-data'}}
        return await axios.post(POSTS_URL,postData,config)
}


export const likeDis=async (postID)=>{
        const LIKDIS_URL = `${BACKEND_DOMIN}/api/v1/posts/like-dis/${postID}/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}}
        return await axios.get(LIKDIS_URL,config)
}


export const saveCancel=async (postID)=>{
        const SAVEDS_URL = `${BACKEND_DOMIN}/api/v1/posts/save-cancel/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}}
        return await axios.post(SAVEDS_URL,postID,config)
}


export const getPostDetails=async (postID)=>{
        const GET_POST_DETAILS = `${BACKEND_DOMIN}/api/v1/posts/post-details/`
        const config={"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}
        return await axios.get(GET_POST_DETAILS,{params:{'post_id':postID},headers:config})
}


export const updatePost=async (updateData)=>{
        const UPDATE_URL = `${BACKEND_DOMIN}/api/v1/posts/post-details/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`,"Content-Type":'multipart/form-data'}}
        return await axios.put(UPDATE_URL,updateData,config)
}

export const deletePost=async (postID)=>{
        const DELETE_URL = `${BACKEND_DOMIN}/api/v1/posts/post-details/`
        const config={"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}
        return await axios.delete(DELETE_URL,{
                data:postID,
                headers:config
        })
}

export const getAllUsers=async ()=>{
        const GET_ALL_USERS = `${BACKEND_DOMIN}/api/v1/all-users/`
        const config={"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}
        return await axios.get(GET_ALL_USERS,{headers:config})
}
export const createFollow=async (user)=>{
        const   CREATE_FOLLOW_URL = `${BACKEND_DOMIN}/api/v1/create-follows/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}}
        return await axios.post(CREATE_FOLLOW_URL,user,config)
}
export const getProfileData=async (username)=>{
        const GET_FollowersAndThose = `${BACKEND_DOMIN}/api/v1/profile_data/`
        const config={"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}
        return await axios.get(GET_FollowersAndThose,{
                params:{'username':username},
                headers:config}
                )
        }
export const updateUserProfiel=async (newData)=>{
        const   UPDATE_USER_PROFIEL = `${BACKEND_DOMIN}/api/v1/update-user-data/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`,"Content-Type":'multipart/form-data'}}
        return await axios.put(UPDATE_USER_PROFIEL,newData,config)
}

export const updatePassword=async (password)=>{
        const   UPDATE_PASSWOERD = `${BACKEND_DOMIN}/api/v1/auth/users/set_password/`
        const config={headers:{"Authorization":`Bearer ${JSON.parse(localStorage['jwt']).access}`}}
        return await axios.post(UPDATE_PASSWOERD,password,config)
}