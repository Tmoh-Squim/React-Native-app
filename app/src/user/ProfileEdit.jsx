import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import React,{useState,useEffect} from 'react';
import {ChevronLeftIcon,} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Country,getCities} from "country-state-city"
import {Picker} from "@react-native-picker/picker"
import {UserIcon,EnvelopeIcon,DevicePhoneMobileIcon,MapPinIcon} from "react-native-heroicons/outline"
import {useSelector} from "react-redux"
import axios from "axios"
export default function ProfileEdit() {
  const navigation = useNavigation();
  const user = useSelector((state)=>state.user.user.user)
  const [countries,setCountries] = useState([])
  const [select,setSelect] = useState(1)
  const [name] = useState(user.name)
  const [email,setEmail] = useState(user.email)
  const [phone,setPhone] = useState(`${user.phone}`)
  const [location,setLocation] = useState('Munyuini')
  const [district,setDistrict] = useState('Gatundu')
  const [county,setCounty] = useState('Kiambu')

  const handleEmail =(text)=>{
    setEmail(text)
  }
  const handlePhone =(text)=>{
    setPhone(text)
  }

  const handleLocation= (text) =>{setLocation(text)}
  const handleDistrict= (text) =>{setDistrict(text)}
  const handleCounty= (text) =>{setCounty(text)}

  const get = ()=>{
    const county= Country.getAllCountries()
    setCountries(county)
  }

  useEffect(()=>{
    get()
  },[])
  const handleUpdate =async () =>{
    try {
      const data ={
        email:email,
        phone:phone,
        user:user,
        deliveryDetails:[
        { 
         county:county,
         district:district,
         location:location
        }
        ]
      }
     const res = await axios.put('https://squim-native-app.onrender.com/api/v1/auth/update-user',{data})

      Alert.alert(res.data.message)
    } catch (error) {
      Alert.alert("Something went wrong")
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <View
        className="w-full h-[61px] justify-center"
        style={{backgroundColor: '#88dae0'}}>
        <View className="mx-3  flex flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-white text-xl mx-auto">Edit Profile </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-3 mx-3 mb-10">
        <Text className="text-center text-xl font-bold text-black">
          Personal Details{' '}
        </Text>
        <View className="mt-2">
          <View className="mt-3 relative">
            <TextInput
              value={name}
              type="text"
              className="border w-full rounded-[18px] pl-4 h-[45px] capitalize"
              editable={false}
              style={{color: 'black'}}
            />
            <View className="absolute right-3 top-3">
            <UserIcon size={20} color='gray' />
            </View>
         
           
          </View>
          <View className="absolute top-1 left-3 items-center bg-gray-100 px-3 ">
            <Text className="text-neutral-500 tracking-[1px] ">Full Name </Text>
          </View>
          <View>
            <View className="mt-8 relative">
              <TextInput
                value={email}
                keyboardType="email-address"
                className="border  w-full rounded-[18px] pl-4 h-[45px]"
                onChangeText={handleEmail}
                style={{color: 'black'}}
              />
              <View className="absolute right-3 top-3">
            <EnvelopeIcon size={20} color='gray' />
            </View>
            </View>
            <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
              <Text className="text-neutral-500 tracking-[1px] ">Email *</Text>
            </View>
          </View>

          <View>
            <View className="mt-8 relative">
              <TextInput
                value={phone}
                keyboardType='numeric'
                onChangeText={handlePhone}
                className="border  w-full rounded-[18px] pl-4 h-[45px]"
                style={{color: 'black'}}
              />
              <View className="absolute right-3 top-3">
            <DevicePhoneMobileIcon size={20} color='gray' />
            </View>
            </View>
            <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
              <Text className="text-neutral-500 tracking-[1px] ">
                Phone Number *
              </Text>
            </View>
          </View>

          <Text className="text-center text-[18px] font-semibold text-black mt-6">
            Select Gender{' '}
          </Text>
          <View className="items-center justify-center flex flex-row mt-4">
            <TouchableOpacity onPress={()=>setSelect(1)}>
            <View
              className={`${select===1 ? ' bg-orange-500':null} mx-4`}
              style={{
                height: 16,
                width: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
              </TouchableOpacity>
            <Text className="text-black">Male </Text>
            <TouchableOpacity onPress={()=>setSelect(2)} >
            <View
              className={`${select===2 ? ' bg-orange-500':null} mx-4`}
              style={{
                height: 16,
                width: 16,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
               </TouchableOpacity>
            <Text className="text-black">Female </Text>
           
          </View>

          <Text className="text-center text-xl font-bold text-black mt-6">
            Delivery Details{' '}
          </Text>
          <View>
            <View className="mt-6 relative">
              <TextInput
                value={county}
                type="number"
                className="border w-full rounded-[18px] pl-4 h-[45px]"
                onChangeText={handleCounty}
                style={{color: 'black'}}
              />
                <View className="absolute right-3 top-3">
            <MapPinIcon size={20} color='gray' />
            </View>
            </View>
            <View className="absolute top-4 left-3 items-center bg-gray-100 px-3 ">
              <Text className="text-neutral-500 tracking-[1px] ">County *</Text>
            </View>
            <View>
              <View className="mt-8 relative">
                <TextInput
                  value={district}
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
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
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
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
        </View>
        <TouchableOpacity
          className="mt-10 w-[90%] mx-auto py-3 mb-10 rounded-xl items-center"
          style={{backgroundColor: 'orange'}}
          onPress={handleUpdate}>
          <Text className="text-white font-bold tracking-[1px] text-[19px]">
            Update{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
