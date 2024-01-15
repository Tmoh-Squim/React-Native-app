import {View, Text, TextInput, TouchableOpacity, Image,ScrollView,Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker"
import {useDispatch} from "react-redux"
import {deleteProduct,updateProduct} from "../../redux/Products"
export default function ProductUpdate({route}) {
  const {product} = route.params;
  const dispatch = useDispatch()
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

  const handleName = (text) =>{setName(text)}
  const handleDescription = (text) =>{setDescription(text)}
  const handleDiscountPrice = (text) =>{setDiscountPrice(text)}
  const handleoriginalPrice = (text) =>{setOriginalPrice(text)}
  const handleCategory = (text) => {setCategory(text)}

  const newform = {
    name:name,
    description:description,
    category:category,
    originalPrice:originalPrice,
    discountPrice:discountPrice
  }

  const handleProductUpdate = (product) =>{
    try {
      const id = product._id
      dispatch(updateProduct(id,newform))
    } catch (error) {
      Alert.alert('Something went wrong')
    }
  }

  const handleDeleteProduct =async(product) =>{
    try {
      const id = product._id
      console.log(id)
      dispatch(deleteProduct(id))
    } catch (error) {
      console.log(error)
    }
  }
 
  
  return (
      <ScrollView className="mt-3 px-2">
          <TouchableOpacity className="mt-2" onPress={() => navigation.goBack()}>
        <ChevronLeftIcon color="black" size={30} />
      </TouchableOpacity>
        <View>
          <Text className="text-black py-1 text-xl">Product name</Text>
          <TextInput
            value={name}
            onChangeText={handleName}
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
            onChangeText={handleDescription}
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
            onChangeText={handleoriginalPrice}
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
            onChangeText={handleDiscountPrice}
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
            onChangeText={handleCategory}
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
        <TouchableOpacity className="p-3 items-center rounded-xl bg-orange-600 w-[95%] mx-auto my-7" onPress={()=>handleDeleteProduct(product)}>
          <Text className="text-white font-bold tracking-[1px] text-xl">
            Delete Product{' '}
          </Text>
        </TouchableOpacity>
       

        <TouchableOpacity className="p-3 items-center rounded-xl bg-orange-600 w-[95%] mx-auto my-3" onPress={()=>handleProductUpdate(product)}>
          <Text className="text-white font-bold tracking-[1px] text-xl">
            Update Product{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
  );
}
