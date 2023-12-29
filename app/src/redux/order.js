import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
export const getUserOrders = createAsyncThunk('getUserOrders',async(id)=>{
    try {
        const response = await axios.get(`https://mern-web-yn5l.onrender.com/api/v2/order/get-all-orders/${id}`)
        console.log('res_order',response.data)
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