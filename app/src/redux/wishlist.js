import { createSlice } from '@reduxjs/toolkit';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

const initialState = {
  wishlist: []
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
    reducers: {
      addToWishlist(state, action) {
        
        const itemIndex = state.wishlist.findIndex((item)=>item._id === action.payload._id)

        if (itemIndex >= 0){
          return
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

export const { addToWishlist,removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
