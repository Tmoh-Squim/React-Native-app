import {useSelector} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ProductData} from '../data/ProductData';
import {HeartIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function WishList() {
  const cart = useSelector(state => state.cart.cartItem);
  const [count, setCount] = useState(1);
  const total = 200 * count;
  const navigation = useNavigation();
  console.log('cart', cart);

  return (
    <SafeAreaView>
      <ScrollView>
        {ProductData && ProductData.length !== 0 ? (
          <View>
            <View className="flex flex-row justify-between mx-2 mt-2">
              <View className=" flex-row mx-2">
                <HeartIcon color="red" size={30} />
                <Text className="text-black mx-1 my-auto">
                  {ProductData.length} items
                </Text>
              </View>
              <XCircleIcon
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
            <View>
              {ProductData.slice(0, 4).map((item, index) => {
                return (
                  <ScrollView className="mx-2 mt-2">
                    <View className="flex-1 flex-row my-1 align-middle">
                      <Image
                        source={item.image}
                        className="w-[80px] h-[80px]"
                      />
                      <View className="align-middle ml-2 m-auto">
                        <Text className="text-black text-center">
                          {item.productName.length < 20
                            ? item.productName
                            : item.productName.slice(0, 25)}
                        </Text>
                        <Text className="text-neutral-400 mt-2">
                          Ksh {item.price} * {count}
                        </Text>
                        <TouchableOpacity className="text-red-400 mt-1">
                          <Text className="text-red-400">Add To Cart </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity>
                        <Text className="text-black m-auto">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              })}
            </View>
          </View>
        ) : (
          <View className="w-full h-screen justify-center align-middle ">
            <Text className="text-black text-center">
              Your wishlist is empty!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
