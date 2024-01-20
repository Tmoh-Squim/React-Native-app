import React, { useEffect } from 'react';
import {Platform} from "react-native"
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/Store';
import { getProducts } from './src/redux/Products';
import {getTotal} from "./src/redux/cart"
import { View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import {LoadUser} from "./src/redux/user"
import {getAllOrders} from "./src/redux/order"
import {getAllEvents} from "./src/redux/events"
import Router from './src/navigation/Router.jsx';
//import SplashScreen from 'react-native-splash-screen'
const AppWrapper = () => {
  const {isLoading} = useSelector((state) => state.products);
  const {user} = useSelector((state)=>state.user)

  useEffect(() => {
    // Dispatch getProducts only after cart state has been initialized
    store.dispatch(getProducts());
    store.dispatch(getTotal())
    store.dispatch(LoadUser())
    store.dispatch(getAllEvents())
    store.dispatch(getAllOrders());
    console.log('user',user)
  }, [store]); 
  {/*useEffect(() => {
    if(Platform.OS === "android")
    SplashScreen.hide()
  }, []);
*/}
  return (
    <>
      <StatusBar backgroundColor='#9ee4d4' barStyle='dark-content' />
 {/* {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
   ) : ( */}
        <Router />
  {/*  )} */}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the background color and opacity
  },
});

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;
