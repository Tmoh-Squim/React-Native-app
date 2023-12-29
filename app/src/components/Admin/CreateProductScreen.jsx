import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Image
} from 'react-native';
import React,{useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLongLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {Categories} from '../../data/Categories.js';

import {Picker} from '@react-native-picker/picker';
import DocumentPicker from "react-native-document-picker"

export default function CreateProductScreen() {
  console.log(Categories);
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [quantity,setQuantity] = useState('')
  const [category,setCategory] = useState('')
  const [images,setImages] = useState([])
  const navigation = useNavigation();

  const selectImages = async ()=>{
    try {
      const results= await DocumentPicker.pick({
        type:[DocumentPicker.types.images],
        allowMultiSelection:true
        
      })
      setImages(results)

      console.log('imgs',images)

    } catch (error) {
      console.log(error)
    }
  }

  const handleName=(name)=>{
    setName(name)
  }
  const handleDescription=(text)=>{setDescription(text)}
  const handleCategory=(name)=>{setCategory(name)}
  const handleQuantity=(name)=>{setQuantity(name)}
  const handlePrice=(name)=>{setPrice(name)}

  const json={name,description,price,quantity,category}

  const handleSubmit = () => {
    Alert.alert('submitted');
    console.log('json',json)
    console.log(name,description,price,quantity,category)
  };
  return (
    <SafeAreaView className="h-screen w-full">
      <View
        className="w-full h-[40px] justify-center"
        style={{backgroundColor: '#88dae0'}}>
        <View className="mx-3  flex flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4">
            <ArrowLongLeftIcon size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-black mt-1 text-center text-2xl border-b w-[90%] mx-auto">
            Create Product
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[90%] mx-auto">
          <View>
            <TextInput
              type="text"
              placeholder="Enter product name"
              placeholderTextColor="black"
              value={name}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-lg"
              onChangeText={handleName}
            />
          </View>
          <View>
            <TextInput
              type="text"
              placeholder="Enter product description"
              multiline
              numberOfLines={10}
              value={description}
              placeholderTextColor="black"
              onChangeText={handleDescription}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <View>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter product quantity"
              placeholderTextColor="black"
              onChangeText={handleQuantity}
              value={quantity}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <View>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter product price"
              placeholderTextColor="black"
              value={price}
              onChangeText={handlePrice}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <View>
            <TextInput
              type="text"
              placeholder="Enter product category "
              placeholderTextColor="black"
              value={category}
              onChangeText={handleCategory}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <Picker>
            {
              Categories?.map((i)=>{
                return (
                  <Picker>
                  <Picker.Item lable="Select category" value='Select category' />
                  <Picker.Item value={i.name} lable={i.name} key={i.index} />
                  </Picker>
                )
              })
            }
          </Picker>
          <TouchableOpacity className="my-4 bg-blue-700 p-2 items-center rounded-xl" onPress={selectImages} >
          <Text className="text-white">CHOOSE FILES </Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-between flex-wrap">
          {
            images?.map((i,index)=>{
              return (
                <View className="p-1">
                <Image source={i} className="w-[88px] h-[88px]" key={index}/>
                </View>
              )
            })
          }
          </View>

          <TouchableOpacity
            className="p-3 bg-orange-600 w-[90%] mx-auto mt-10 mb-5 rounded-lg"
            onPress={handleSubmit}>
            <Text className="text-white text-center text-xl">
              Create Product{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
