import {View, Text, ScrollView, TouchableOpacity, Image,Alert} from 'react-native';
import React,{useState,useEffect} from 'react';
import {ShoppingBagIcon} from 'react-native-heroicons/solid';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Picker} from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
export default function UpdateOrder({route}) {
  const navigation = useNavigation();
  const {order,shippingAddress,paymentInfo,status,user,totalPrice,id} = route.params;
  const [statuss,setStatus] = useState(status)
  const [data,setData] = useState(["Processing","Shipping","Transferred to delivery partner","On the way","Delivered"])
 useEffect(() => {
    if(statuss === "Delivered"){
        setData(["Delivered"])
      }
      if(statuss === "Shipping"){
        setData(["Shipping","Transferred to delivery partner","On the way","Delivered"])
      }
      if(statuss === "Transferred to delivery partner"){
        setData(["Transferred to delivery partner","On the way","Delivered"])
      }
      if(statuss === "On the way"){
        setData(["On the way","Delivered"])
      }
 }, [statuss]);
console.log(statuss)
 const handleUpdateStatus =async () =>{
  try {
    console.log(id)
    const token = await AsyncStorage.getItem('token')
    const data = {
      status:statuss
    }
    const response = await axios.put(`/api/v2/order/update-order/${id}`,data,{
      headers:{
        'Authorization':token
      }
    })
    Alert.alert(response.data.message)
  } catch (error) {
    Alert.alert('Something went wrong')
    console.log(error)
  }
 }


  return (
    <ScrollView
      className="w-full h-screen"
      showsVerticalScrollIndicator={false}>
      <View className="mt-2 mx-1">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={25} color="gray" />
        </TouchableOpacity>
      </View>
      <SafeAreaView className="mx-1 mt-0">
        <View className="flex flex-row items-center">
          <ShoppingBagIcon size={32} color="red" />
          <Text className="text-black ml-5 text-2xl text-center">
            Order Details
          </Text>
        </View>
        <View className="flex flex-row justify-between mx-1.5 mt-5">
          <Text className="text-gray-400 text-xl">
            Order ID:#{order._id.slice(0, 8)}
          </Text>
          <View>
            <Text className="text-gray-400 text-xl">Placed on:</Text>
            <Text className="text-gray-400 text-xl">
              {order.createdAt.slice(0, 10)}
            </Text>
          </View>
        </View>

        <View className="mt-3">
          <View className="p-1 flex-1 flex-row justify-between border-b pb-3 border-neutral-400">
            <Image
              source={{uri: order.images[0]}}
              className="w-[100px] h-[100px] rounded-md"
            />
            <View>
            <Text className="text-black text-[15px] mt-3 mx-2">{order.name.length > 32 ? order.name.slice(0,32) : order.name}</Text>
            <Text className="text-gray-400 text-[20px] mt-3 mx-2">{order.cartQuantity} x {order.discountPrice}</Text>
            </View>
          </View>
          <Text className="text-right text-xl text-black mt-2 mx-2">Total Paid: Ksh {totalPrice}</Text>

          <View>
          <View>
          <Text className="text-xl text-[20px] text-black ml-3 mt-8 font-bold">Shipping Address:</Text>
          </View>
          <View>
            <Text className="text-red-500 text-xl mt-1.5 ml-2"><Text className="text-black">County: </Text> {shippingAddress.county}</Text>
            <Text className="text-red-500 text-xl mt-1.5 ml-2"><Text className="text-black">District: </Text> {shippingAddress.district}</Text>
            <Text className="text-red-500 text-xl mt-1.5 ml-2"><Text className="text-black">Location: </Text> {shippingAddress.exactLocation}</Text>
          </View>

          <View>
          <Text className="text-xl text-[20px] text-black ml-3 mt-8 font-bold">Customer Info:</Text>
          </View>
          <View className="border-b border-gray-400 pb-3">
            <Text className="text-black text-xl mt-1.5 ml-2">Name: {user.name}</Text>
            <Text className="text-black text-xl mt-1.5 ml-2">Email: {user.email}</Text>
            <Text className="text-black text-xl mt-1.5 ml-2">Phone: {user.phone}</Text>
          </View>

          <View className="mt-5">
            <Text className="mt-1 text-black text-xl ml-2 font-bold tracking-wider">
                Payment Info:
            </Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Type: {paymentInfo?.type}</Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Status: {paymentInfo?.status}</Text>
          </View>
          <View className="mt-5 border-b pb-3 border-gray-400">
            <Text className="mt-1 text-black text-xl ml-2 font-bold tracking-wider">
               Order Specification:
            </Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Size: {order?.selectedSize}</Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Color: {order?.selectedColor}</Text>
          </View>

          <View className="mt-2">
            <Text className="mt-1 text-black text-xl ml-2 font-bold tracking-wider">
                Order Status:
            </Text>
            <View className="rounded-xl border" style={{backgroundColor:'black'}}>
            <Picker selectedValue={statuss} color="white" onValueChange={(text)=>setStatus(text)}>
                {
                    data.map((i,index)=>(
                   <Picker.Item label={i} value={i} key={index} />  
                    ))
                }
                
            </Picker>
            </View>
          </View>

          <View className="mt-5 justify-between mx-2 mb-5">
            <TouchableOpacity className="p-3 rounded-md bg-red-400 w-[130px]" onPress={handleUpdateStatus}>
                <Text className="text-white text-center font-bold text-[18px]">
                    Update Status
                </Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
