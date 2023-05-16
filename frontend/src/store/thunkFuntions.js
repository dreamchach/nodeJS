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
