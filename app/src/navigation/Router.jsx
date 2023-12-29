import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import SearchScreen from "../screens/SearchScreen"
import CartScreen from "../screens/CartScreen"

import UserScreen from "../screens/UserScreen"
import ProfileEdit from "../screens/UserEditProfileScreen"
import Wishlist from "../screens/Wishlist"
import AdminDashboard from "../screens/AdminDashboard"
import CreateProductScreen from "../components/Admin/CreateProductScreen"
import DeliveryScreen from "../screens/DeliverySceen"
import Login from "../auth/Login"
import Orders from "../user/Orders"
import UpdateProduct from "../components/Admin/ProductUpdate"
import {useSelector} from "react-redux"
const Stack = createStackNavigator();

const Router = () => {

  const {isAuthenticated} = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 230 } }, // Set the duration as per your preference
            close: { animation: 'timing', config: { duration: 230 } }, // Set the duration as per your preference
          },
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="user" component={isAuthenticated ? UserScreen : Login} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="wishlist" component={Wishlist} />
       {
          user?.user? (
            <Stack.Screen name="admin" component={user?.user.role === "Admin" ? AdminDashboard : HomeScreen} />
          ):null
        } 
        <Stack.Screen name="create-product" component={CreateProductScreen} />
        <Stack.Screen name="delivery" component={DeliveryScreen} />
        <Stack.Screen name="login" component={user?.user ? HomeScreen : Login} />
        <Stack.Screen name="user-orders" component={user?.user? Orders : Login} />
        <Stack.Screen name="product-update" component={user?.user?.role === "Admin" ? UpdateProduct : HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
