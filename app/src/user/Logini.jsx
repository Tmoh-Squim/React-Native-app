import {View, Text, TouchableOpacity, TextInput, Alert,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EyeSlashIcon, EyeIcon} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChevronLeftIcon} from "react-native-heroicons/outline"
import {useDispatch} from "react-redux"
import {LoadUser} from "../redux/user"
import RNRestart from 'react-native-restart';
export default function Logini() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [active,setActive] = useState(false)
  

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handlePassword = text => {
    setPassword(text);
  };
  const handlePhone = name => {
    setPhone(name);
  };
  useEffect(() => {
   password && password.length !== 0 ?(
      setActive(true)
    ):(
      setActive(false)
    )
  }, [password]);
  

  const handleSubmit = async () => {
    try {
      const data = {phone, password};
      const response = await axios.post(
        '/api/v1/auth/login',data
      );
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      Alert.alert(response.data.message)
      navigation.navigate('HomeScreen')
      dispatch(LoadUser())
    } catch (error) {
      Alert.alert("Something went wrong")
      console.log(error);
    }
  };
 
  
  return (
    <ScrollView className="px-3 h-screen bg-neutral-200">
        <TouchableOpacity className="mt-3" onPress={()=>navigation.goBack()}>
            <ChevronLeftIcon size={30} color='black' />
        </TouchableOpacity>
      <View className="mt-20">
        <View className="my-5">
          <Text className="text-black text-3xl font-semibold text-center ">
            Welcome Back!{' '}
          </Text>
        </View>
        <View>
            <Text className="text-black my-2">Input phone number:</Text>
          <TextInput
            className="text-black border px-3 rounded-xl"
            value={phone}
            keyboardType='numeric'
            onChangeText={handlePhone}
            placeholder="Enter your phone number"
            placeholderTextColor="green"
          />
        </View>
        <View className="mt-7">
        <Text className="text-black my-2">Input Password:</Text>
        <View className="relative">
          <TextInput
            className="text-black border px-3 rounded-xl"
            value={password}
            secureTextEntry={visible === true ? false : true}
            onChangeText={handlePassword}
            placeholder="Enter your password"
            placeholderTextColor="green"
          />
          </View>
          {visible !== true ? (
            <View className="absolute right-2 top-11">
              <EyeIcon
                size={30}
                color="black"
                onPress={() => setVisible(true)}
              />
            </View>
          ) : (
            <View className="absolute right-2 top-11">
              <EyeSlashIcon
                size={30}
                color="black"
                onPress={() => setVisible(false)}
              />
            </View>
          )}
        </View>
        <TouchableOpacity className="mt-2 mb-5">
            <Text className="text-neutral-600">Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" mb-5" onPress={()=>navigation.navigate('register-user')}>
            <Text className="text-neutral-600">Don't have an account?</Text>
        </TouchableOpacity>
        {
          active && (
            <View className="mx-auto w-full">
            <TouchableOpacity
              className="p-2 mx-auto bg-red-600 w-[95%] items-center rounded-xl mt-10"
              onPress={handleSubmit}>
              <Text className="text-black tracking-[1px] text-2xl ">Login</Text>
            </TouchableOpacity>
            </View>
          )
        }
       
      </View>
    </ScrollView>
  );
}
