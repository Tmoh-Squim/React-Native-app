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


const Home = () => {
  return (
    <SafeAreaView className="h-screen">
         
         
    <ScrollView showsVerticalScrollIndicator={false} className="mb-[70px]" style={{marginBottom:'70px',height:'100%'}}>
    <Header />
      <SubHeader />
      <Category />
      <Carousel />
      <Services />
      <Deals />
      <Brands />
      <ProductScreen />
    </ScrollView>
        <Navbar />  
  
    </SafeAreaView>
  );
};


export default Home;
