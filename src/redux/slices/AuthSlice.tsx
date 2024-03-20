import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { INewUser } from "@/types";
import  axios from 'axios'

export const BACKEND_DOMIN='http://127.0.0.1:8000/'
const REGISTER_URL=`${BACKEND_DOMIN}/api/v1/auth/users/`
const LOGIN_URL=`${BACKEND_DOMIN}/api/v1/auth/jwt/create/`
const GET_USER_INFO=`${BACKEND_DOMIN}/api/v1/auth/users/me/`





export const register = createAsyncThunk(
    "auth/register",
    async (userData: INewUser, thunkAPI) => {
        try {
            const config={headers:{"Content-type":"application/json",}}
            const response=await axios.post(REGISTER_URL,userData,config)
            
            return response.data
            
        } 
        
        catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    }
)


export const login = createAsyncThunk(
    "auth/login",
    async (loginData) => {
        
            const config={headers:{"Content-type":"application/json",}}
            const response=await axios.post(LOGIN_URL,loginData,config)
            if (response.data) {
                localStorage.removeItem('jwt')
                localStorage.setItem("jwt", JSON.stringify(response.data))

                
            }
            return response.data
    }
)
export const getUserInfo = createAsyncThunk(
    "auth/userInfo",
    async (accessToken) => {
        
            const config={headers:{"Authorization":`Bearer ${accessToken}`,}}
            const response=await axios.get(GET_USER_INFO,config)
            return response.data
    }
)



export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return localStorage.removeItem("jwt")
    }
)



const user = JSON.parse(localStorage.getItem("jwt"))
const initialState = {
    user: user ? user : null,
    userInfo:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.user=null
            state.userInfo=null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = 'Null'
        }
    },
    extraReducers: (builder) => {
        builder
        //register cses
        .addCase(register.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isLoading = false
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message=`${action.payload}`
        })
        //login cses
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = `${action.payload}`
            state.user = null
        })
        //logout cses
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.userInfo = null
        })
        // userInfo cases
        .addCase(getUserInfo.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUserInfo.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isLoading = false
            state.userInfo=action.payload
        })
        .addCase(getUserInfo.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.userInfo = null
            state.isLoading = false
            state.message=`${action.payload}`
        })
    }
})


// eslint-disable-next-line no-empty-pattern
export const {reset} = authSlice.actions
export default authSlice.reducer