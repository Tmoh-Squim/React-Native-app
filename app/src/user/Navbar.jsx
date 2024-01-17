import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  HomeIcon,
  Bars3BottomLeftIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  Bars3Icon,
  ListBulletIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
export default function Navbar() {
  const [active, setActive] = useState(true);
  const cart = useSelector(state => state.cart);
  const wishlist = useSelector(state => state.wishlist);
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  return (
    <View
      className={`${
        active === true
          ? 'absolute bottom-0  right-0 left-0 items-center flex flex-row px-3 py-3 justify-between w-full bg-neutral-200 z-30 shadow-md h-[50px]'
          : 'hidden'
      } `}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <HomeIcon size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <ListBulletIcon size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('wishlist')}>
        <View className="relative">
          <HeartIcon size={30} color="black" />
        </View>
        <View className="absolute bottom-3 left-3 w-[17px] h-[17px] bg-red-600 items-center rounded-full">
          <Text className="text-white text-center">
            {wishlist?.wishlist?.length > 0 ? wishlist?.wishlist?.length : 0}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('cart')}>
        <View className="relative">
          <ShoppingCartIcon size={30} color="black" />
        </View>
        <View className="absolute bottom-3 left-3 w-[17px] h-[17px] bg-green-600 items-center rounded-full">
          <Text className="text-white text-center">
            {cart?.cartItem?.length > 0 ? cart?.cartItem?.length : 0}
          </Text>
        </View>
      </TouchableOpacity>
      {user?.user ? (
        <TouchableOpacity onPress={() => navigation.navigate('user')}>
          <UserCircleIcon size={30} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <UserCircleIcon size={30} color="black" />
        </TouchableOpacity>
      )}
      {user?.user && user?.user?.role === 'Admin' && (
        <TouchableOpacity onPress={() => navigation.navigate('admin')}>
          <Bars3BottomLeftIcon size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
