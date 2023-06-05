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

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async(_, thunkAPI) => {
        try{
            const response = await instance.post('/users/logout')
            console.log(response)

            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const addToCart = createAsyncThunk(
    'user/addToCart',
    async(body, thunkAPI) => {
        try{
            const response = await instance.post('/users/cart', body)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const getCartItems = createAsyncThunk(
    'user/getCartItems',
    async({cartItemIds, userCart}, thunkAPI) => {
        try{
            const response = await instance.get(`/products/${cartItemIds}?type=array`)

            await userCart.forEach(cartItem=>{
                response.data.forEach((productDetail, index)=>{
                    if(cartItem.id === productDetail._id) {
                        response.data[index].qua = cartItem.qua
                    }
                })
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)

export const removeItem = createAsyncThunk(
    'user/removeItem',
    async(body, thunkAPI) => {
        try{
            const response = await instance.delete(`/users/cart?id=${body}`)

            response.data.cart.forEach((item)=>{
                response.data.productInfo.forEach((productDetail, index)=>{
                    if(item.id === productDetail._id){
                        response.data.productInfo[index].qua = item.qua
                    }
                })
            })
            return response.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data || error.message)
        }
    }
)