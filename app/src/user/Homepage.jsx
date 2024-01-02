import { ScrollView, View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context"
import React,{useState,useEffect} from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import Deals from '../components/Deals';
import Brands from '../components/Brands';
import ProductScreen from '../screens/ProductScreen';
import Navbar from "./Navbar"
import Slider from "../components/Slider"


const Home = () => {
  return (
    <SafeAreaView className="h-screen">
    <View className="mb-[60px]" >
    <ScrollView showsVerticalScrollIndicator={false}>
    <Header />
      <SubHeader />
      <Category />
      <Slider />
      <Deals />
      <Brands />
     {/* <ProductScreen /> */}
    </ScrollView>
  </View>
  <Navbar />  

    </SafeAreaView>
  );
};


export default Home;
