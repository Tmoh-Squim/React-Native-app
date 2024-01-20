import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import {ArrowLeftIcon} from 'react-native-heroicons/outline';
  import {useNavigation} from '@react-navigation/native';
  import {Categories} from '../../data/Categories.js';
  import {Picker} from '@react-native-picker/picker';
  import DocumentPicker from 'react-native-document-picker';
  import {useDispatch, useSelector} from 'react-redux';
  import AsyncStorage from "@react-native-async-storage/async-storage"
  import axios from "axios"
  export default function CreateProductScreen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState([]);
    const [color, setColor] = useState('');
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState('');
    const [expirationTime,setExpirationTime] = useState('')
  
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const selectImages = async () => {
      try {
        const results = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
          allowMultiSelection: true,
        });
        setImages([...images, ...results]);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleRemoveImage = (index) =>{
      const image= [...images]
      image.splice(index,1)
      setImages(image)
    }
    const handleName = name => {
      setName(name);
    };
    const handleDescription = text => {
      setDescription(text);
    };
    const handleQuantity = name => {
      setQuantity(name);
    };
    const handlePrice = name => {
      setDiscountPrice(name);
    };
    const handleoriginalPrice = name => {
      setOriginalPrice(name);
    };

    const expirationTimeInMilliseconds = parseInt(expirationTime)*60
  
    const json = {name, description, discountPrice, stock:quantity, category, images,colors,sizes};
  
    const handleSubmit = async () => {
      try {
        const token =await AsyncStorage.getItem('token')
        const formData = new FormData();
       
        formData.append('name', name);
        formData.append('description', description);
        formData.append('discountPrice', discountPrice);
        formData.append('originalPrice', originalPrice); 
        formData.append('stock', quantity);
        formData.append('expirationTime',expirationTimeInMilliseconds);
        formData.append('category', category);
        sizes.forEach((size) => {
         formData.append("sizes", size);
       });
        
        // Append each image file to the FormData
        images.forEach((image) => {
         formData.append("images", image);
       });
       colors.forEach((color) => {
         formData.append("colors", color);
       });
       if(name.length ==='' || description.length==='' || category.length===''){
        Alert.alert('Some of the fields are mandatory')
        return
      }else{
        const res = await axios.post(
          'https://squim-native-app.onrender.com/api/v2/event/create-event',
          formData,
          {
            headers: {
              'Authorization': token,
              'Content-Type': 'multipart/form-data',
              'Accept':'*/*'
            },
          }
        );
        Alert.alert(res.data.message)
      }
    
      
        
    
    } catch (error) {
      if(error === 'AxiosError' || error ==='Network Error'){
        Alert.alert('Network error')
      }
      Alert.alert('Something went wrong!')
      console.log(error)
    }
    };
    
    const handleColor = text => {
      setColor(text);
    }; 
    const handleAddColor = () => {
      if (color.trim() !== '') {
        setColors([...colors, color]);
        setColor('');
      }
      return;
    };
    const handleRemoveColor = index => {
      const res = [...colors];
      res.splice(index, 1);
      setColors(res);
    };
    const handleAddSize = () => {
      if (size.trim() !== '') {
        setSizes([...sizes, size]);
        setSize('');
      }
      return;
    };
    const handleRemoveSize = index => {
      const res = [...sizes];
      res.splice(index, 1);
      setSizes(res);
    };
    return (
      <ScrollView className="h-screen " showsVerticalScrollIndicator={false}>
        <View
          className="w-full h-[40px] justify-center"
          style={{backgroundColor: '#88dae0'}}>
          <View className="mx-3  flex flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4">
              <ArrowLeftIcon size={22} color="black" />
            </TouchableOpacity>
            <Text className="text-black mt-1 text-center text-2xl  w-[90%] mx-auto">
              Create Event
            </Text>
          </View>
        </View>
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
              placeholder="Enter product originalPrice"
              placeholderTextColor="black"
              value={originalPrice}
              onChangeText={handleoriginalPrice}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <View>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter product discountPrice"
              placeholderTextColor="black"
              value={discountPrice}
              onChangeText={handlePrice}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
          <View className="border rounded-xl  mt-3 bg-black">
            <Picker
              selectedValue={category}
              onValueChange={(item) =>
                setCategory(item)
              }>
              {Categories &&
                Categories.map((item, index) => (
                  <Picker.Item
                    label={item.title}
                    key={index.id}
                    value={item.title}
                    style={{width:'50%'}}
                  />
                ))}
            </Picker>
          </View>
          <View className="mt-5 flex flex-row px-2 justify-between">
            <TextInput
              className="rounded-lg p-2 border w-[60%]"
              onChangeText={handleColor}
              color="black"
              placeholder="Enter product color"
              placeholderTextColor="black"
            />
            <TouchableOpacity
              className="p-2 w-[90px] bg-black rounded-md"
              onPress={handleAddColor}>
              <Text className="text-white text-[20px] text-center">Add</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap mt-2">
            {colors &&
              colors.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-1 flex-row  flex-wrap mt-2 bg-black rounded-xl p-2 mx-1"
                  onPress={() => handleRemoveColor(index)}>
                  <Text className="text-green-500 text-center text-[15px]">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
  
          <View className="mt-5 flex flex-row px-2 justify-between">
            <TextInput
              className="rounded-lg p-2 border w-[60%]"
              onChangeText={(text)=>setSize(text)}
              color="black"
              placeholder="Enter product size"
              placeholderTextColor="black"
            />
            <TouchableOpacity
              className="p-2 w-[90px] bg-black rounded-md"
              onPress={handleAddSize}>
              <Text className="text-white text-[20px] text-center">Add</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap mt-2">
            {sizes &&
              sizes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-1 flex-row  flex-wrap mt-2 bg-black rounded-xl p-2 mx-1"
                  onPress={() => handleRemoveSize(index)}>
                  <Text className="text-green-500 text-center text-[15px]">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
  
          <TouchableOpacity
            className="my-4 bg-blue-700 p-2.5 items-center rounded-xl"
            onPress={selectImages}>
            <Text className="text-white">CHOOSE FILES </Text>
          </TouchableOpacity>
  
          <View className="flex flex-row justify-between flex-wrap">
            {images?.map((i, index) => {
              return (
                <TouchableOpacity className="p-1" onPress={()=>handleRemoveImage(index)}>
                  <Image source={i} className="w-[88px] h-[88px]" key={index} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            <TextInput
              keyboardType="numeric"
              placeholder="Enter expiration time in min"
              placeholderTextColor="black"
              onChangeText={(text)=>setExpirationTime(text)}
              value={expirationTime}
              style={{color: 'green'}}
              className="border pl-4 mt-5 rounded-[15px]"
            />
          </View>
  
          <TouchableOpacity
            className="p-3 bg-orange-600 w-[90%] mx-auto mt-10 mb-5 rounded-lg"
            onPress={handleSubmit}>
            <Text className="text-white text-center text-xl">
              Create Event{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  