import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from "react-toastify";

// const initialState = {
//     isLoggedIn: false,
//     user: null,
//     isSuccess: false,
//     isError: false,
//     errorMessage: "",
// }

const initialState = []

const auth = createSlice({
    name: 'auth',
    initialState: {
        auth: {
            message: '',
            user: '',
            isLoggedIn: false
        }
    },

    reducers: {
        signupUserAction: (state, action) => {
            state.auth = {
                message: action.payload.data.message,
                user: action.payload.data.resData,
                isLoggedIn: true
            };
            return state

        },
        loginUserAction: (state, action) => {
            state.auth = {
                message: action.payload.data.message,
                user: action.payload.data.userAuth,
                isLoggedIn: true
            };
            return state
        },
        logoutUserAction:(state,action)=>{
            state.auth={
                message:'logout successfully',
                user:'',
                isLoggedIn:false

            }
        }
    },
})


export const { signupUserAction, loginUserAction ,logoutUserAction} = auth.actions
export const Auth = auth.reducer;