import {useSelector} from 'react-redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from "react-redux"
import {HeartIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {removeFromWishlist} from "../redux/wishlist"
import { addToCart } from "../redux/cart";
export default function WishList() {
  const {wishlist} = useSelector(state => state.wishlist);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  console.log('cart', wishlist);

  const handleAddToWishlist =(item)=>{
    dispatch(addToCart(item))
  }
  const handleRemoveFromWishlist =(item)=>{
    dispatch(removeFromWishlist(item))
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {wishlist && wishlist.length !== 0 ? (
          <View>
            <View className="flex flex-row justify-between mx-2 mt-2">
              <View className=" flex-row mx-2">
                <HeartIcon color="red" size={30} />
                <Text className="text-black mx-1 my-auto">
                  {wishlist.length} items
                </Text>
              </View>
              <XCircleIcon
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
            <View>
              {wishlist.slice(0, 4).map((item, index) => {
                return (
                  <ScrollView className="mx-2 mt-2">
                    <View className="flex-1 flex-row my-1 align-middle">
                      <Image
                        source={item.images[0]}
                        className="w-[80px] h-[80px]"
                      />
                      <View className="align-middle ml-2 m-auto">
                        <Text className="text-black text-center">
                          {item.name.length < 20
                            ? item.name
                            : item.name.slice(0, 25)}
                        </Text>
                        <Text className="text-neutral-400 mt-2">
                          Ksh {item.originalPrice} * {count}
                        </Text>
                        <TouchableOpacity className="text-red-400 mt-1" onPress={()=>handleAddToWishlist(item)}>
                          <Text className="text-red-400">Add To Cart </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={()=>handleRemoveFromWishlist(item)}>
                        <Text className="text-black m-auto">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                );
              })}
            </View>
          </View>
        ) : (
          <>
          <View className="flex flex-row justify-between mx-2 mt-2">
              <View className=" flex-row mx-2">
                <HeartIcon color="black" size={30} />
                <Text className="text-black mx-1 my-auto">
                  {wishlist.length} items
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
              Your wishlist is empty!
            </Text>
          </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
