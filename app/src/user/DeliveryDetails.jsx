import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Country, State, City} from 'country-state-city';
import {MapPinIcon, ChevronLeftIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select"
import Picker from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Delivery({route}) {
  const navigation = useNavigation();
  const [county, setCounty] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState('');
  //const {price} = route.params;
  const {price} = 1200

  const handleCounty = text => {
    setCounty(text);
  };
  const handleDistrict = text => {
    setDistrict(text);
  };
  const handleLocation = text => {
    setLocation(text);
  };

  const shippingAddress = {
    county: county,
    district: district,
    exactLocation: location,
  };
  const [countries, setCountries] = useState([]);

  

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
                value={county}
                onChangeText={handleCounty}
                className="border w-full rounded-[18px] tracking-[1px] pl-4 h-[45px]"
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
                  value={district}
                  type="number"
                  placeholder="Enter district"
                  placeholderTextColor='black'
                  className="border  w-full rounded-[18px] px-4 tracking-[1px] h-[45px]"
                  onChangeText={handleDistrict}
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
                  value={location}
                  type="number"
                  placeholder="Enter exact location"
                  placeholderTextColor="black"
                  className="border  w-full rounded-[18px] px-4 h-[45px]"
                  onChangeText={handleLocation}
                  style={{color: 'black'}}
                />
              </View>
              <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
                <Text className="text-neutral-500 tracking-[1px] ">
                  Exact Location *
                </Text>
              </View>
            </View>
            <RNPickerSelect
            onValueChange={value=>console.log(value)}
            items={[
              {
                lable:'Java',value:'Java'
              },
              {
                lable:"JavaScript",value:"JavaScript"
              },
              {
                lable:"Node Js",value:"Node Js"
              },
            ]}
            />
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
        style={{backgroundColor: 'red'}}
        onPress={navigation.navigate('payment', {
          totalPrice: price,
          shippingAddress: shippingAddress,
        })}>
        <Text className="text-white font-bold tracking-[1px] text-[19px]">
          Proceed To Checkout{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
