import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
export const LoadUser = createAsyncThunk('getUser',async()=>{
    const token =await AsyncStorage.getItem('token')
    console.log('auth',token)
 const response = await axios.get('https://squim-native-app.onrender.com/api/v1/auth/user',{
        headers:{
            'Authorization':token
        }
    })
   return response.data
})
//all user for admin
export const getAllusers = createAsyncThunk('all-users',async()=>{
    const token =await AsyncStorage.getItem('token')
    const response = await axios.get('https://squim-native-app.onrender.com/api/v1/auth/all-users',{
        headers:{
            'Authorization':token
        }
    })

    return response.data
})
//delete user for admin
export const deleteUser = createAsyncThunk('delete-user',async(id)=>{
    const token =await AsyncStorage.getItem('token')
     await axios.delete(`/api/v1/auth/delete-user/${id}`,{
        headers:{
            'Authorization':token
        }
    })
})

const initialState={
    user:{},
    isAuthenticated:false,
    loading:true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGOUT(state){
          state.user = {};
          state.isAuthenticated = false;
          state.loading = false;
        },
      },
    
    extraReducers: (builder) => {
        builder
            .addCase(LoadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoadUser.fulfilled, (state, action) => {
                console.log('success',action.payload)
                state.user = action.payload;
                state.isAuthenticated=true;
                state.loading = false;
            })
            .addCase(LoadUser.rejected, (state, action) => {
                console.log('failed',action.payload)
                state.error = action.payload;
                state.loading = false;
            })
    },
});


export const { reducer: userReducer } = userSlice;
export const {LOGOUT} = userSlice.actions