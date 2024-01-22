import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
export const getAllEvents = createAsyncThunk('events',async(req,res)=>{
    try {
        const response = await axios.get('/api/v2/event/events')

        return response.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    events:[],
    loading:false,
    error:null
}

const EventSlice = createSlice({
    name:'events',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllEvents.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAllEvents.fulfilled,(state,action)=>{
            state.events = action.payload
            state.loading = false
        })
        .addCase(getAllEvents.rejected,(state,action)=>{
            state.error = action.payload
            state.loading = false
        })
    }
})

export default EventSlice.reducer