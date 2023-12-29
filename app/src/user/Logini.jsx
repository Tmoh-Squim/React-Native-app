import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EyeSlashIcon, EyeIcon} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChevronLeftIcon} from "react-native-heroicons/outline"
export default function Logini() {
  const [email, setPhone] = useState('');
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);


  const navigation = useNavigation();
  const handlePassword = text => {
    setPassword(text);
  };
  const handlePhone = name => {
    setPhone(name);
  };

  const handleSubmit = async () => {
    try {
      const data = {email, password};
      if (password.length < 3 || password.length === '') {
        Alert.alert('password must be at least 3 characters');
      }
      const response = await axios.post(
        'https://mern-web-yn5l.onrender.com/api/v2/user/login-user',
        data,
      );
      console.log('res', response.data);
      const {token} = response.data;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('HomeScreen');
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="px-3 h-screen bg-neutral-200">
        <TouchableOpacity className="mt-3" onPress={()=>navigation.goBack()}>
            <ChevronLeftIcon size={30} color='black' />
        </TouchableOpacity>
      <View className="mt-20">
        <View className="my-5">
          <Text className="text-black text-2xl font-bold text-center ">
            Welcome Backnn!{' '}
          </Text>
        </View>
        <View>
            <Text className="text-black my-2">Input email address:</Text>
          <TextInput
            className="text-black border px-3 rounded-xl"
            value={email}
            onChangeText={handlePhone}
            placeholder="Enter your email number"
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
        <View className="mx-auto w-full">
        <TouchableOpacity
          className="p-2.5 mx-auto bg-red-600 w-[87%] items-center rounded-xl mt-10"
          onPress={handleSubmit}>
          <Text className="text-white tracking-[1px] text-xl font-bold">Login</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
