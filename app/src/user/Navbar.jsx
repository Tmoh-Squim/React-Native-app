import {View, Text, TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {useNavigation} from '@react-navigation/native';
import {
  HomeIcon,
  Bars3BottomLeftIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
export default function Navbar() {
  const [active,setActive] = useState(true)
  const cart = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.user)
  const navigation = useNavigation();
  return (
    <View className={`${active===true?'absolute  right-0 left-0 items-center flex flex-row px-2 justify-between w-full bg-white z-30 shadow-md h-[60px]':'hidden'} `}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <HomeIcon size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Bars3BottomLeftIcon size={30} color="black" />
      </TouchableOpacity>
      {
        user?.user?(
          <TouchableOpacity onPress={() => navigation.navigate('user')}>
        <UserCircleIcon size={30} color="black" />
      </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <UserCircleIcon size={30} color="black" />
        </TouchableOpacity>
        )
      }
      <TouchableOpacity onPress={() => navigation.navigate('admin')}>
        <Bars3Icon size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <HeartIcon size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('cart')}>
        <View className="relative">
        <ShoppingCartIcon size={30} color="black" />
        </View>
        <View className="absolute top-0 right-0 w-[20px] h-[20px] bg-green-600 items-center rounded-full">
          <Text className="text-white text-center">{cart?.cartItem?.length > 0? cart?.cartItem?.length : 0}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
