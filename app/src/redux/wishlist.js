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
  wishlistItem: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
    reducers: {
      addToWishlist(state, action) {
        console.log(action.payload)
        const itemIndex = state.wishlistItem.findIndex((item)=>item._id === action.payload._id)

        if (itemIndex >= 0){
          state.wishlistItem[itemIndex].cartQuantity += 1
        }
        else{
          const tempProducts = {...action.payload,cartQuantity:1}
          state.wishlistItem.push(tempProducts)
        }
        


      },
      removeFromWishlist(state,action){
       const newState= state.wishlistItem.filter((item)=>item._id !== action.payload._id)

       state.wishlistItem = newState
      },
      
    },
    
});

export const { addToWishList,removeFromCart } = wishlistSlice.actions;
export default wishlistSlice.reducer;
