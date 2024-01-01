import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Alert} from "react-native"
import axios from "axios";

export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get('https://mern-web-yn5l.onrender.com/api/v2/product/get-all-products');
        return response.data;
        
    } catch (error) {
        throw error;
    }
});
//delete product for admin
export const deleteProduct = createAsyncThunk('delete-product',async(id)=>{
    const token =await AsyncStorage.getItem('token')
    const res = await axios.delete(`/api/v2/product/delete-product/${id}`,{
        headers:{
            'Authorization':token
        }
    }).then((Alert.alert(res.message)))
})

//create product for admin
export const createProduct = createAsyncThunk('create-product', (json) => async ()=>{
    const token =await AsyncStorage.getItem('token')
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
   const res= await axios.post(`/api/v2/product/create-product`,json,config,{
       headers:{
           'Authorization':token
       }
   })
   .then((Alert.alert(res.message)))
})
//create product for admin
export const updateProduct = createAsyncThunk('update-product', (newform) => async (id)=>{
    const token =await AsyncStorage.getItem('token')
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
   const res = await axios.put(`/api/v2/product/update-product/${id}`,newform,config,{
       headers:{
           'Authorization':token
       }
   }).then((Alert.alert(res.message)))
})

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