import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Alert} from "react-native"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
export const getProducts = createAsyncThunk('getProducts', async () => {
    try {
        const response = await axios.get('https://squim-native-app.onrender.com/api/v2/product/products');
        return response.data;
        
    } catch (error) {
        throw error;
    }
});
//delete product for admin
export const deleteProduct = createAsyncThunk('delete-product',async(id)=>{
    const token =await AsyncStorage.getItem('token')
    console.log(id)
    const res = await axios.delete(`https://squim-native-app.onrender.com/api/v2/product/delete-product/${id}`,{
        headers:{
            'Authorization':token
        }
    }).then((Alert.alert(res.data.message)))
})

//create product for admin
export const createProduct = createAsyncThunk('create-product', (json) => async ()=>{
    try {
        const token =await AsyncStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
       const res= await axios.post(`https://squim-native-app.onrender.com/api/v2/product/create-product`,json,config,{
           headers:{
               'Authorization':token
           }
       })
       Alert.alert(res.data.message)
    } catch (error) {
        Alert.alert('Something went wrong')
    }
  
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