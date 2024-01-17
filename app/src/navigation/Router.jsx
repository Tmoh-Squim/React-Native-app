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
import RegisterUser from "../auth/RegisterUser"
import Orders from "../user/Orders"
import UpdateProduct from "../components/Admin/ProductUpdate"
import PaymentScreen from "../screens/PaymentScreen"
import OrderDetails from "../user/orderDetails"
import AllOrders from "../components/Admin/Orders"
import UpdateOrder from "../components/Admin/UpdateOrder"
import {useSelector} from "react-redux"
import FAQ from "../user/FAQ"
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
    {/*   {
          user?.user? ( */}
            <Stack.Screen name="admin" component={AdminDashboard} />
      {/*    ):null
        } */}
        <Stack.Screen name="create-product" component={CreateProductScreen} />
        <Stack.Screen name="delivery" component={ user?.user ? DeliveryScreen : Login } />
        <Stack.Screen name="payment" component={ user?.user ? PaymentScreen : Login } />
        <Stack.Screen name="login" component={user?.user ? HomeScreen : Login} />
        <Stack.Screen name="faq" component={FAQ} />
        <Stack.Screen name="register-user" component={user?.user ? HomeScreen : RegisterUser} />
        <Stack.Screen name="user-orders" component={user?.user? Orders : Login} />
        <Stack.Screen name="product-update" component={user?.user?.role === "Admin" ? UpdateProduct : HomeScreen} />
        <Stack.Screen name="Order-details" component={OrderDetails} />
        <Stack.Screen name="admin-orders" component={user?.user?.role === "Admin" ? AllOrders : HomeScreen} />
        <Stack.Screen name="admin-update-order" component={user?.user?.role === "Admin" ? UpdateOrder : HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
