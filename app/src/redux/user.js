import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
export const LoadUser = createAsyncThunk('getUser',async()=>{
    const token =await AsyncStorage.getItem('token')
    console.log('auth',token)
 const response = await axios.get('https://mern-web-yn5l.onrender.com/api/v2/user/getuser',{
        headers:{
            'Authorization':token
        }
    })
   return response.data
})

const initialState={
    user:{},
    isAuthenticated:false,
    loading:true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
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
            });
    },
});


export const { reducer: userReducer } = userSlice;