import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
export const getUserOrders = createAsyncThunk('getUserOrders',async(id)=>{
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await axios.get(`https://squim-native-app.onrender.com/api/v2/order/user-order/${id}`,{
            headers:{
                'Authorization':token
            }
        })
        return response.data   
    } catch (error) {
        console.log(error)
    }
    
})

const initialState ={
    orders:[],
    loading:true,
    error:null
}

const orderSlice = createSlice({
    name:'user-orders',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getUserOrders.pending,(state)=>{
            state.loading=true
        })
        .addCase(getUserOrders.fulfilled,(state,action)=>{
            state.orders = action.payload
            state.loading = false
        })
        .addCase(getUserOrders.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default orderSlice.reducer