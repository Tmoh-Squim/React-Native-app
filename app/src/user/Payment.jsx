import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowLeftIcon, MinusIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
export default function Payment() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orderData, setOrderData] = useState();
  const [active, setActive] = useState(1);
  const {user} = useSelector(state => state.user.user);
  const orders = async () => {
    const res = await AsyncStorage.getItem('latest-order');
    setOrderData(JSON.parse(res));
  };
  useEffect(() => {
    orders();
  }, []);
  const paymentInfo = {
    type: 'Lipa na mpesa',
    status: 'Success',
  };
  const cart = orderData?.cart;
  const deliveryDetails = orderData?.deliveryDetails;
  const totalPrice = orderData?.totalPrice;
  const discount = orderData?.discount;
  const shipping = orderData?.shipping;
  const handleMpesaPayment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(
        'https://squim-native-app.onrender.com/api/v2/order/create-order',
        {cart, user, deliveryDetails, paymentInfo, totalPrice},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      Alert.alert(res.data.message);
      AsyncStorage.removeItem('latest-order');
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Something went wrong!');
      console.log(error);
    }
  };
  return (
    <ScrollView className="w-full h-screen">
      <View className="px-1.5">
        <TouchableOpacity
          className="px-2 mt-2"
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={22} color="black" />
        </TouchableOpacity>
        <View className="bg-neutral-50 mt-3 w-full p-3">
          <View>
            <View className="flex flex-row justify-between px-2 py-7 mt-8 border-b  border-t border-gray-300">
              <TouchableOpacity
                className="border-2 border-black w-[20px] h-[20px] rounded-full items-center justify-center"
                onPress={() => setActive(1)}>
                <TouchableOpacity
                  className={`${
                    active === 1
                      ? `border-2 border-black w-[10px] h-[10px] bg-black rounded-full`
                      : null
                  }`}></TouchableOpacity>
              </TouchableOpacity>
              <Text className="text-black text-xl font-bold">
                Pay with Paypal{' '}
              </Text>
            </View>
            {active === 1 && (
              <View className=" border-b pb-2 border-gray-300 my-2">
                <TouchableOpacity
                  className="bg-red-500 p-3 rounded-lg w-[45%]"
                  onPress={() =>
                    navigation.navigate('Card-payment', {
                      amount: orderData?.totalPrice,
                      email: user?.email,
                      phone:user?.phone
                    })
                  }>
                  <Text className="text-white text-xl font-bold">Pay Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View>
            <View className="flex flex-row justify-between py-7 px-2 mt-10 mb-5 border-b border-t border-gray-300">
              <TouchableOpacity
                className="border-2 border-black w-[20px] h-[20px] rounded-full items-center justify-center"
                onPress={() => setActive(2)}>
                <TouchableOpacity
                  className={`${
                    active === 2
                      ? `border-2 border-black w-[10px] h-[10px] bg-black rounded-full`
                      : null
                  }`}></TouchableOpacity>
              </TouchableOpacity>
              <Text className="text-black text-xl font-bold">
                Lipa na mpesa{' '}
              </Text>
            </View>
            {active === 2 && (
              <View className="border-b pb-3 border-gray-300">
                <Text className="text-neutral-400 text-[15px]">
                  Enter your preffered phone number{' '}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  className="border my-2 rounded-xl px-4"
                  placeholder="254xxxxxxxxx"
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  className="bg-red-500 p-3 rounded-lg w-[45%]"
                  onPress={handleMpesaPayment}>
                  <Text className="text-white text-xl font-bold">Pay Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="w-90% bg-neutral-50 p-4 rounded-md my-4 ">
          <View className="flex justify-between flex-row mt-4">
            <Text className="text-black font-serif text-xl">Subtotal:</Text>
            <Text className="text-black text-xl">
              Ksh {orderData?.totalPrice}
            </Text>
          </View>
          <View className="flex justify-between flex-row mt-3">
            <Text className="text-black font-serif text-xl">Shipping:</Text>
            <Text className="text-black text-xl">
              {shipping && shipping !== 0 ? (
                <Text className="text-black text-xl">Ksh {shipping}</Text>
              ) : (
                <Text className="text-black text-xl">
                  <MinusIcon size={22} color="black" />
                </Text>
              )}
            </Text>
          </View>
          <View className="flex justify-between flex-row mt-3 border-b pb-3 border-gray-400">
            <Text className="text-black font-serif text-xl">Discount:</Text>
            {discount && discount !== 0 ? (
              <Text className="text-black text-xl">Ksh {discount}</Text>
            ) : (
              <Text className="text-black text-xl">
                <MinusIcon size={22} color="black" />
              </Text>
            )}
          </View>

          <View className="mt-3 pb-3">
            <Text className="text-black text-xl text-right">
              Ksh {orderData?.totalPrice}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
