import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React,{useState} from 'react';
import {ShoppingBagIcon} from 'react-native-heroicons/solid';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export default function OrderDetails({route}) {
  const navigation = useNavigation();
  const [open,setOpen] = useState(false)
  const {order,shippingAddress,paymentInfo,status,totalPrice} = route.params;
  return (
    <ScrollView
      className="w-full h-screen"
      showsVerticalScrollIndicator={false}>
      <View className="mt-2 mx-1">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={25} color="gray" />
        </TouchableOpacity>
      </View>
      <SafeAreaView className="mx-1 mb-3 mt-0">
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
              className="w-[100px] h-[100px] rounded-sm"
            />
            <View>
            <Text className="text-black text-[15px] mt-3 mx-2">{order.name.length > 32 ? order.name.slice(0,32) : order.name}</Text>
            <Text className="text-gray-400 text-[20px] mt-3 mx-2">{order.cartQuantity} x {order.discountPrice}</Text>
            </View>
          </View>
          <Text className="text-right text-xl text-black mt-2 mx-2">Total Paid: Ksh {totalPrice }</Text>

          <View>
          <View>
          <Text className="text-xl text-[20px] text-black ml-3 mt-8 font-bold">Shipping Address:</Text>
          </View>
          <View>
            <Text className="text-black text-xl mt-1.5 ml-2">County: {shippingAddress.county}</Text>
            <Text className="text-black text-xl mt-1.5 ml-2">District: {shippingAddress.district}</Text>
            <Text className="text-black text-xl mt-1.5 ml-2">Location: {shippingAddress.exactLocation}</Text>
          </View>

          <View className="mt-5">
            <Text className="mt-1 text-black text-xl ml-2 font-bold tracking-wider">
                Payment Info:
            </Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Type: {paymentInfo?.type}</Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Status: {paymentInfo?.status}</Text>
          </View>

          <View className="mt-2">
            <Text className="mt-1 text-black text-xl ml-2 font-bold tracking-wider">
                Order Status:
            </Text>
            <Text className="mt-1 text-gray-600 tracking-[1px] text-[19px] ml-2">Order Status: <Text className="text-black">{status}</Text></Text>
          </View>

          <View className="mt-5 justify-between flex flex-row mx-2">
            {
              status === "Delivered" ? (
                <TouchableOpacity className="p-3 rounded-md bg-black w-[110px]" onPress={()=>setOpen(true)}>
                <Text className="text-white text-center font-bold text-[16px]">
                    Give a Refund
                </Text>
            </TouchableOpacity>
              ):null
            }
            <TouchableOpacity className="p-3 rounded-md bg-black w-[130px]">
                <Text className="text-white text-center font-bold text-[16px]">
                    Write a Review
                </Text>
            </TouchableOpacity>
          </View>
          </View>

          {
            open === true &&(
              <View className="absolute w-[60%] m-auto bg-white h-[60%] z-30">
                <View className="right-3 top-3">
                  <TouchableOpacity onPress={()=>setOpen(false)}>
                    <XMarkIcon size={25} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
