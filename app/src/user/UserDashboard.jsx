import {View, Text, ScrollView, TouchableOpacity,TochableWithoutFeedack,Alert} from 'react-native';
import React,{useEffect} from 'react';
import {
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  WrenchScrewdriverIcon,
  ArrowRightCircleIcon
} from 'react-native-heroicons/outline';
import {PencilIcon,PhoneIcon,UserCircleIcon,QuestionMarkCircleIcon,StarIcon,ShieldExclamationIcon} from "react-native-heroicons/solid"
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function UserDashboard() {
  const user = useSelector((state)=>state.user.user.user)
  const navigation = useNavigation();

  const handleLogout = async() =>{
    await AsyncStorage.removeItem('token')
    Alert.alert("Logged out  successfully")
    navigation.navigate('HomeScreen')
  }
  
  return (
    <SafeAreaView>
      <View
        className="w-full h-[61px] justify-center"
        style={{backgroundColor: '#88dae0'}}>
        <View className="mx-3  flex flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ArrowLeftIcon size={23} color="black" />
          </TouchableOpacity>
          <UserCircleIcon size={30} color='black' />
          <Text className="text-white text-xl mx-5">{user.name} </Text>
        </View>
      </View>
      <ScrollView className="mx-4 mb-10 " showsVerticalScrollIndicator={false}>
        <View className="mt-3">
          <View className="border-b">
            <Text className="text-2xl font-bold text-black mb-6">
              User Information
            </Text>
          </View>
          <View className="mt-7">
            <View className="flex flex-row items-center">
              <UserIcon size={22} color="gray" />
              <View className="mx-6">
                <Text className="text-black text-[18px]">Name</Text>
                <Text className="text-neutral-500">{user.name}</Text>
              </View>
            </View>
          </View>
          <View className="mt-7">
            <View className="flex flex-row items-center">
              <EnvelopeIcon size={22} color="gray" />
              <View className="mx-6">
                <Text className="text-black text-[18px]">Email</Text>
                <Text className="text-neutral-500">{user.email}</Text>
              </View>
            </View>
          </View>
          <View className="mt-7">
            <View className="flex flex-row items-center">
              <PhoneIcon size={20} color="gray" />
              <View className="mx-6">
                <Text className="text-black text-[18px]">Phone Number</Text>
                <Text className="text-neutral-500">{user.phoneNumber}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="mt-7 justify-between flex flex-row" onPress={()=>navigation.navigate('ProfileEdit')}>
            <View className="flex flex-row">
              <PencilIcon size={20} color="gray" />
              <Text className="text-black text-[18px] mx-6">Edit Account</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('ProfileEdit')}>
              <ChevronRightIcon size={20} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <View className="border-b">
            <Text className="text-2xl text-black font-bold my-7">
              User Actions{' '}
            </Text>
          </View>
          <TouchableOpacity className="flex flex-row items-center justify-between" onPress={()=>navigation.navigate('user-orders')}>
            <View className="mt-7 flex flex-row items-center">
              <ShoppingBagIcon size={22} color="gray" className="mx-3" />
              <Text className="text-black text-[16px] mx-6">My Orders </Text>
            </View>
            <TouchableOpacity className="mt-7">
              <ChevronRightIcon size={22} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between" onPress={()=>navigation.navigate('wishlist')}>
            <View className="mt-7 flex flex-row items-center">
              <HeartIcon size={22} color="gray" className="mx-3" />
              <Text className="text-black text-[16px] mx-6">My Wishlist </Text>
            </View>
            <TouchableOpacity className="mt-7" onPress={()=>navigation.navigate('wishlist')}>
              <ChevronRightIcon size={20} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between" onPress={()=>navigation.navigate('cart')}>
            <View className="mt-7 flex flex-row items-center">
              <ShoppingCartIcon size={22} color="gray" className="mx-3" />
              <Text className="text-black text-[16px] mx-6">My Cart </Text>
            </View>
            <TouchableOpacity
              className="mt-7"
              onPress={() => navigation.navigate('cart')}>
              <ChevronRightIcon size={20} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <View className="border-b">
            <Text className="text-2xl text-black font-bold my-7">Extras </Text>
          </View>
          <View className="mt-7">
            <View className="mt-7 flex flex-row justify-between">
              <View className="flex flex-row">
                <ShieldExclamationIcon size={22} color="gray" />
                <Text className="text-black text-[19px] mx-6">
                  Privacy Policy{' '}
                </Text>
              </View>
              <TouchableOpacity>
                <ChevronRightIcon size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="mt-7 flex flex-row justify-between">
              <View className="flex flex-row">
                <WrenchScrewdriverIcon size={22} color="gray" />
                <Text className="text-black text-[19px] mx-6">
                  Terms and Conditions{' '}
                </Text>
              </View>
              <TouchableOpacity>
                <ChevronRightIcon size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="mt-7 flex flex-row justify-between">
              <View className="flex flex-row">
                <QuestionMarkCircleIcon size={22} color="gray" />
                <Text className="text-black text-[19px] mx-6">FAQS </Text>
              </View>
              <TouchableOpacity>
                <ChevronRightIcon size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="mt-7 flex flex-row justify-between">
              <View className="flex flex-row">
                <StarIcon size={22} color="gray" />
                <Text className="text-black text-[19px] mx-6">
                  Rate us Play Store{' '}
                </Text>
              </View>
              <TouchableOpacity>
                <ChevronRightIcon size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout}>
            <View className="mt-7 mb-10 flex flex-row ">
              
                <ArrowRightCircleIcon size={22} color="gray" />
              
              <Text className="text-black text-[19px] mx-6">Log Out </Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
