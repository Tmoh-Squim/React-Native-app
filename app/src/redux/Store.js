// store.js
import { configureStore } from "@reduxjs/toolkit";
import {productReducer} from './Products';
import cartReducer from "./cart"
import wishlistReducer from "./wishlist"
import {userReducer} from "./user"
import orderReducer from "./order"
import {allOrderSlice} from "./order"
import eventReducer from "./events"
const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        wishlist:wishlistReducer,
        user:userReducer,
        orders:orderReducer,
        allOrders:allOrderSlice,
        events:eventReducer
    },

});

export default store;
