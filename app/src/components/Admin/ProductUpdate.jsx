import {View, Text, TextInput, TouchableOpacity, Image,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker"
export default function ProductUpdate({route}) {
  const {product} = route.params;
  console.log(product);
  const navigation = useNavigation();
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [discountPrice, setDiscountPrice] = useState(
    `${product.discountPrice}`,
  );
  const [originalPrice, setOriginalPrice] = useState(
    `${product.originalPrice}`,
  );
  const [category, setCategory] = useState(product.category);
  const [images, setImages] = useState(product.images);
 
  
  return (
    <SafeAreaView className="px-2 mb-6">
      <TouchableOpacity className="mt-2" onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="black" size={30} />
      </TouchableOpacity>
      <ScrollView className="mt-3">
        <View>
          <Text className="text-black py-1 text-xl">Product name</Text>
          <TextInput
            value={name}
            placeholderTextColor="green"
            className="border rounded-xl px-3"
            style={{color: 'green'}}
          />
        </View>
        <View>
          <Text className="text-black py-1 text-xl">Product Description</Text>
          <TextInput
            value={description}
            placeholderTextColor="green"
            multiline
            numberOfLines={8}
            className="border rounded-xl px-3"
            style={{color: 'green'}}
          />
        </View>
        <View>
          <Text className="text-black py-1 text-xl">
            Product Original Price
          </Text>
          <TextInput
            value={originalPrice}
            placeholderTextColor="green"
            keyboardType="numeric"
            className="border rounded-xl px-3"
            style={{color: 'green'}}
          />
        </View>
        <View>
          <Text className="text-black py-1 text-xl">
            Product Discount Price
          </Text>
          <TextInput
            value={discountPrice}
            placeholderTextColor="green"
            keyboardType="numeric"
            className="border rounded-xl px-3"
            style={{color: 'green'}}
          />
        </View>
        <View>
          <Text className="text-black py-1 text-xl">Product Category</Text>
          <TextInput
            value={category}
            placeholderTextColor="green"
            className="border rounded-xl px-3"
            style={{color: 'green'}}
          />
        </View>
        <View className="flex flex-row justify-between my-2">
        {
            images.map((item,index)=>{
                return (
                    <Image key={index} source={{uri: item}} className="w-[90px] h-[90px]" />
                )
            })
        }
        </View>
       

        <TouchableOpacity className="p-3 items-center rounded-xl bg-orange-600 w-[90%] mx-auto my-7">
          <Text className="text-white font-bold tracking-[1px] text-xl">
            Update Product{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
