import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProductData} from '../data/ProductData';
import {ShoppingBagIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTotal, removeFromCart} from '../redux/cart';
import {AsyncStorage} from "@react-native-async-storage/async-storage"
import {decreaseQuantity,addToCart} from "../redux/cart"

export default function CartScreen() {
  const cart = useSelector(state => state.cart.cartItem);
  const {cartTotalAmount} = useSelector(state => state.cart);
  const [count, setCount] = useState(cart.cartQuantity);
  console.log('count',count)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = async ()=>{

    navigation.navigate('delivery',{price:cartTotalAmount})
  }

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemove = item => {
    dispatch(removeFromCart(item));
  };
  const handleDecrement = (item)=>{
    dispatch(decreaseQuantity(item))

  }
  const handleIncrement = (item)=>{
      dispatch(addToCart(item))
  }

  return (
    <SafeAreaView className="h-screen">
      <ScrollView className="mb-[68px]">
        {cart && cart.length !== 0 ? (
          <View>
            <View className="flex flex-row justify-between mx-2 mt-2">
              <View className=" flex-row mx-2">
                <ShoppingBagIcon color="black" size={30} />
                <Text className="text-black mx-1 my-auto">
                  {cart.length} items
                </Text>
              </View>
              <XCircleIcon
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
            <View>
              {cart?.map((item, index) => {
                return (
                  <ScrollView className="mx-2 mt-2">
                    <View className="flex-1 flex-row my-1 align-middle">
                      <View className="m">
                        <TouchableOpacity className="w-[20px] h-[20px] rounded-full items-center bg-gray-400 mr-1 my-1" onPress={()=>handleIncrement(item)}>
                          <Text className="text-black text-center ">+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[20px] h-[20px] rounded-full items-center bg-gray-200 mr-1 my-1">
                          <Text className="text-black text-center">{item.cartQuantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[20px] h-[20px] rounded-full items-center bg-gray-400 mr-1 my-1" onPress={()=>handleDecrement(item)}>
                          <Text className="text-black text-center ">-</Text>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={{uri: item.images[0]}}
                        className="w-[80px] h-[80px]"
                      />
                      <View className="align-middle ml-2">
                        <Text className="text-black text-center">
                          {item.name.length < 20
                            ? item.name
                            : item.name.slice(0, 25)}
                        </Text>
                        <Text className="text-neutral-400 mt-2">
                          Ksh {item.discountPrice} * {item.cartQuantity}
                        </Text>
                        <Text className="text-red-400 mt-1">
                          Ksh {item.discountPrice * item.cartQuantity}
                        </Text>
                      </View>
                      <TouchableOpacity
                        className="absolute right-3 top-5"
                        onPress={() => handleRemove(item)}>
                        <Text className="text-black m-auto">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              })}
            </View>
          </View>
        ) : (
          <View>
            <View className="flex flex-row justify-between mx-2 mt-2">
              <View className=" flex-row mx-2">
                <ShoppingBagIcon color="black" size={30} />
                <Text className="text-black mx-1 my-auto">
                  {cart.length} items
                </Text>
              </View>
              <XCircleIcon
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
            <View className="w-full h-screen justify-center align-middle ">
              <Text className="text-black text-center">
                No products added to cart!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {cart?.length !== 0 ? (
        <View className="w-[100%] absolute bottom-0 items-center ">
          <TouchableOpacity
            className="mt-2 mb-3 align-middle rounded-[10px] py-2 px-4"
            style={{backgroundColor: 'red'}}
            onPress={()=>handlePress()}>
            <Text className="text-white font-bold text-2xl">
              Checkout Now (Ksh {cartTotalAmount})
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
