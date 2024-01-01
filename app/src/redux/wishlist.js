import { createSlice } from '@reduxjs/toolkit';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const getInitialCartItems = async () => {
  try {
    const storedCartItems = await AsyncStorage.getItem('tmoh');
    const parsedCartItems =  JSON.parse(storedCartItems);
    return (parsedCartItems);
  } catch (error) {
    console.error('Error retrieving or parsing cart items:', error);
    return [];
  }
};

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
    reducers: {
      addToWishlist(state, action) {
        const itemIndex = state.wishlist.findIndex((item)=>item._id === action.payload._id)

        if (itemIndex >= 0){
          return {
            ...state
          }
        }
        else{
          const tempProducts = {...action.payload}
          state.wishlist.push(tempProducts)
        }
        


      },
      removeFromWishlist(state,action){
       const newState= state.wishlist.filter((item)=>item._id !== action.payload._id)

       state.wishlist = newState
      },
      
    },
    
});

export const { addToWishList,removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
