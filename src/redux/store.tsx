import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/AuthSlice'
import browdingSlice from './slices/browsing'


export const store = configureStore({
    reducer:{
        auth:authSlice,
        browsing:browdingSlice,
    },
    })
