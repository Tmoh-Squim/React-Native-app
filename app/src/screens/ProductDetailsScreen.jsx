import {useDispatch,useSelector} from 'react-redux';
import React, {useState,useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../redux/cart';
const {width, height} = Dimensions.get('window');
import ProductDetails from "../user/ProductDetails"
export default function ProductDetailsScreen({route}) {



  

  return (
    <ProductDetails route={route} />
  );
}



const styles = {
  smallImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    padding: 2,
  },
  smallImage: {
    width: width * 0.32,
    height: height * 0.2,
  },
};
