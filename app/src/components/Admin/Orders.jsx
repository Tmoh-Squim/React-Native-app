import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllOrders} from '../../redux/order';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowRightIcon, ArrowLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
export default function Orders() {
  const dispatch = useDispatch();
  const {allOrders} = useSelector(state => state.allOrders);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, allOrders]);
  return (
    <ScrollView
      className="w-full h-screen bg-neutral-100"
      showsVerticalScrollIndicator={false}>
      <View className="mt-2 px-2 flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={25} color="black" />
        </TouchableOpacity>
        <Text className="text-gray-600 ml-8 text-xl ">All Orders</Text>
      </View>
      <SafeAreaView className="mx-1 mt-3">
        {allOrders && allOrders.length > 0 ? (
          <View>
            {allOrders?.map(order => {
              return (
                <View key={order._id}>
                  {order?.cart.map((cartItem, index) => {
                    return (
                      <View key={index} className="w-full">
                        <View className="flex-1 flex-row border p-2 justify-between">
                          <Text className="text-gray-500">
                            #{cartItem._id.slice(0, 8)} |
                          </Text>
                          <Text className="text-black ml-1">
                            {cartItem.name.length > 15
                              ? cartItem.name.slice(0, 22) + '...'
                              : cartItem.name}{' '}
                            |
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('admin-update-order', {
                                order: cartItem,
                                id:order?._id,
                                shippingAddress: order?.deliveryDetails,
                                paymentInfo: order?.paymentInfo,
                                status: order?.status,
                                user: order?.user,
                                totalPrice:order?.totalPrice
                              })
                            }>
                            <ArrowRightIcon size={25} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        ) : (
          <View className="w-full h-screen justify-center text-center align-middle">
            <Text className="text-black text-xl text-center">
              No placed order yet!
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
