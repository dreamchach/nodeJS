import {createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../utils/axios'

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(body, thunkAPI) => {
        try{
            const response = await instance.post(
                '/users/register',
                body
            )
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(body, thunkAPI) => {
        try{
            const response = await instance.post(
                '/users/login',
                body
            )
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const authUser = createAsyncThunk(
    'user/authUser',
    async(_, thunkAPI) => {
        try{
            const response = await instance.get('/users/auth')
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)