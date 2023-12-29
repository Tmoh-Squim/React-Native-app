import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get('https://mern-web-yn5l.onrender.com/api/v2/product/get-all-products');
        return response.data;
        
    } catch (error) {
        throw error;
    }
});

const initialState = {
    products: [],
    isLoading: true,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});


export const { reducer: productReducer } = productSlice;