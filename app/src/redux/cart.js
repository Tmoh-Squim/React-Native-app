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
  cartItem: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
    reducers: {
      addToCart(state, action) {
        const itemIndex = state.cartItem.findIndex((item)=>item._id === action.payload._id)

        if (itemIndex >= 0){
         state.cartItem[itemIndex].cartQuantity += 1
        }
        else{
          const tempProducts = {...action.payload}
          state.cartItem.push(tempProducts)
        }
        
      },
      decreaseQuantity(state,action){
        const itemIndex = state.cartItem.findIndex((item)=>item._id === action.payload._id)
        if(state.cartItem[itemIndex].cartQuantity > 1){
          state.cartItem[itemIndex].cartQuantity -= 1
        }else if(state.cartItem[itemIndex].cartQuantity === 1){
          return{
            ...state
          }
        }
        else{
          return{
            ...state
          }
        }
      },
      removeFromCart(state,action){
       const newState= state.cartItem.filter((item)=>item._id !== action.payload._id)

       state.cartItem = newState
      },
      getTotal(state,action){
        let {total} = state.cartItem.reduce((cartTotal,cartItem)=>{

          const {discountPrice,cartQuantity} = cartItem;
          const itemPrice = discountPrice * cartQuantity

          cartTotal.total += itemPrice;

          return cartTotal
         
        },
        {
          total:0
        })
        state.cartTotalAmount = total
      }
    },
    
});

export const { addToCart,getTotal,removeFromCart,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
