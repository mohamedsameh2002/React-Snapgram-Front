import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios from 'axios'
import { BACKEND_DOMIN } from "./AuthSlice";



const GET_SAVED_POSTS=`${BACKEND_DOMIN}/api/v1/posts/save-cancel/`




export const getUserSavedPosts = createAsyncThunk(
    "browding/browdingInfo",
    async (accessToken) => {
            const config={headers:{"Authorization":`Bearer ${accessToken}`,}}
            return (await axios.get(GET_SAVED_POSTS,config)).data
    }
)



const initialState = {
    cnaNotGetSAvedPost: false,
    doneFoundSaved: false,
    getingNow: false,
    postSaved:null,
}


const browdingSlice = createSlice({
    name: 'browding',
    initialState,
    reducers: {
        addPostToSave:(state,action)=>{
            console.log(action.payload);
            console.log(state.postSaved);
            
        }
    },
    extraReducers: (builder) => {
        builder
        //browsing cses
        .addCase(getUserSavedPosts.pending,(state)=>{
            state.getingNow = true
        })
        .addCase(getUserSavedPosts.fulfilled,(state,action)=>{
            state.doneFoundSaved = true
            state.getingNow = false
            state.cnaNotGetSAvedPost = false
            state.postSaved = action.payload
        })
        .addCase(getUserSavedPosts.rejected,(state)=>{
            state.doneFoundSaved = false
            state.getingNow = false
            state.cnaNotGetSAvedPost = true
        })
    }
})


// eslint-disable-next-line no-empty-pattern
export const {addPostToSave} = browdingSlice.actions
export default browdingSlice.reducer