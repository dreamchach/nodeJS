import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "./thunkFuntions"
import { toast } from "react-toastify"

const initialState = {
    userData: {
        id: '',
        email:'',
        name:'',
        role:0,
        image:''
    },
    isAuth:false,
    isLoading:false,
    error:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
            console.log(1)
        }).addCase(registerUser.fulfilled, (state)=>{
            state.isLoading = false
            toast.info('회원가입을 성공했습니다')
            console.log(2)
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload || '회원가입에 실패했습니다')
        })
    }
})

export default userSlice.reducer