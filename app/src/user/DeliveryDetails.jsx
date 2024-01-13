import {View, Text, TouchableOpacity, TextInput,Alert,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Country, State, City} from 'country-state-city';
import {MapPinIcon, ArrowLeftIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select"
import Picker from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from "react-redux"
export default function Delivery({route}) {
  const navigation = useNavigation();
  const {user} = useSelector((state)=>state.user.user)
  const cart = useSelector(state => state.cart.cartItem);
  const [county, setCounty] = useState(county);
  const [district, setDistrict] = useState(district);
  const [location, setLocation] = useState(location);
  const {price} = route.params;

  const handleCounty = text => {
    setCounty(text);
  };
  const handleDistrict = text => {
    setDistrict(text);
  };
  const handleLocation = text => {
    setLocation(text);
  };

  const deliveryDetails = {
    county: county,
    district: district,
    exactLocation: location,
  };
  const [countries, setCountries] = useState([]);

  const details = () =>{
    user?.deliveryDetails.length > 0 && (
      user?.deliveryDetails.map((item,index)=>{
        return (
          setCounty(item.county),
          setDistrict(item.district),
          setLocation(item.location)
        )
      })
    )
  }

  useEffect(()=>{
    details()
  },[])
  const order = {
    deliveryDetails:deliveryDetails,
    totalPrice:price,
    cart
  }
  const handleSubmit = async () =>{
    if(county=== '' || district === '' || location===''){
      Alert.alert('Please fill in the above fields')
      return
    }
    AsyncStorage.setItem('latest-order',JSON.stringify(order))
    navigation.navigate('payment')
  }

  

  return (
    <ScrollView className="h-screen w-full">
    <SafeAreaView className="w-full px-3  bg-gray-100 h-screen ">
      <TouchableOpacity className="mt-3" onPress={() => navigation.goBack()}>
        <Text>
          <ArrowLeftIcon size={23} color="black" />{' '}
        </Text>
      </TouchableOpacity>
      <View>
        <View className="my-2">
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
                placeholder="Enter your county"
                placeholderTextColor='black'
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
           
          </View>
          <TouchableOpacity>
            <Text className="text-black tracking-wide my-2 ">
              Choose Saved{' '}
            </Text>
          </TouchableOpacity>

          <View className="w-90% bg-white p-4 rounded-md my-4 ">
            <View className="flex justify-between flex-row mt-4">
            <Text className="text-black font-serif text-xl">Subtotal:</Text>
            <Text className="text-black text-xl">Ksh {price}</Text>
            </View>
            <View className="flex justify-between flex-row mt-3 border-b pb-3 border-gray-400">
            <Text className="text-black font-serif text-xl">Discount:</Text>
            <Text className="text-black text-xl">Ksh {Math.round(price/15)}</Text>
            </View>
            <View className="mt-3 pb-3">
              <Text className="text-black text-xl text-right">
               Ksh {price}
              </Text>
              </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="mt-10 w-[95%]   py-3 mb-2 rounded-xl items-center  left-1  "
        style={{backgroundColor: 'red'}}
        onPress={handleSubmit}>
        <Text className="text-white font-bold tracking-[1px] text-[19px]">
          Proceed To Checkout{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
}
