import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Country,State,City} from "country-state-city"
import {
  UserIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Picker from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Delivery({route}) {
  const navigation = useNavigation();
  const {price} = route.params;
  const get = async ()=>{
    try {
      const token =await AsyncStorage.getItem('token')
      console.log('token',token)
    } catch (error) {
      console.log(error)
    }
  }

  get()

  console.log('price',price)

  const [country,setCountry] = useState([])



  return (
    <SafeAreaView className="w-full px-3  bg-gray-100 h-screen ">
      <TouchableOpacity className="mt-3" onPress={() => navigation.goBack()}>
        <Text>
          <ChevronLeftIcon size={30} color="black" />{' '}
        </Text>
      </TouchableOpacity>
      <View>
        <View className="my-3">
          <Text className="text-2xl font-serif text-green-700 border-b text-center tracking-wide w-[90%] mx-auto">
            Fill in Delivery Details{' '}
          </Text>
        </View>
        <View>
          <View>
            <View className="mt-6 relative">
              <TextInput
                value={'Kiambu'}
                className="border w-full rounded-[18px] pl-4 h-[45px]"
                disabled
                style={{color: 'black'}}
              />
              <View className="absolute right-3 top-3">
                <MapPinIcon size={20} color="gray" />
              </View>
            </View>
            <View className="absolute top-4 left-3 items-center bg-gray-100 px-3 ">
              <Text className="text-neutral-500 tracking-[1px] ">County *</Text>
            </View>
            <View>
              <View className="mt-8 relative">
                <TextInput
                  value={'Gatundu'}
                  type="number"
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
                  disabled
                  style={{color: 'black'}}
                />
              </View>
              <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
                <Text className="text-neutral-500 tracking-[1px] ">
                  District *
                </Text>
              </View>
            </View>
            <View>
              <View className="mt-8 relative">
                <TextInput
                  value={'Munyuini'}
                  type="number"
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
                  disabled
                  style={{color: 'black'}}
                />
              </View>
              <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
                <Text className="text-neutral-500 tracking-[1px] ">
                  Exact Location *
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <Text className="text-black tracking-wide my-2 ">
              Choose Saved{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="mt-10 w-[95%]  mx-auto py-3 mb-2 rounded-xl items-center absolute left-6 bottom-0"
        style={{backgroundColor: 'red'}}>
        <Text className="text-white font-bold tracking-[1px] text-[19px]">
          Proceed To Checkout{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
