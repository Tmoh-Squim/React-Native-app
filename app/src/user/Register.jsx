import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EyeSlashIcon, EyeIcon} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone,setPhone] = useState()
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const navigation = useNavigation();
  const handlePassword = text => {
    setPassword(text);
  };
  const handleEmail = name => {
    setEmail(name);
  };
  const handlePhone = name => {
    setPhone(name);
  };
  const handleName = name => {
    setName(name);
  };

  const handleSubmit = async () => {
    try {
      const data = {email, password};
      if (password.length < 3 || password.length === '') {
        Alert.alert('password must be at least 3 characters');
      }
      const response = await axios.post(
        'https://mern-web-yn5l.onrender.com/api/v2/user/register-user',
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
    <SafeAreaView className="px-3 mt-4 h-screen">
      <View className="mt-40">
        <View className="my-5">
          <Text className="text-black text-2xl font-bold text-center ">
            Create New Account{' '}
          </Text>
        </View>
        <View>
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={name}
            onChangeText={handleName}
            placeholder="Enter your full name"
            placeholderTextColor="green"
          />
        </View>
        <View className="my-7">
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={email}
            onChangeText={handleEmail}
            placeholder="Enter your email address"
            placeholderTextColor="green"
          />
        </View>

        <View className="my-7">
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={phone}
            onChangeText={handlePhone}
            keyboardType='numeric'
            placeholder="Enter your phone number"
            placeholderTextColor="green"
          />
        </View>

        <View className="my-7 relative">
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={password}
            secureTextEntry={visible === true ? false : true}
            onChangeText={handlePassword}
            placeholder="Enter your password"
            placeholderTextColor="green"
          />
          {visible !== true ? (
            <View className="absolute right-2 top-2">
              <EyeIcon
                size={30}
                color="black"
                onPress={() => setVisible(true)}
              />
            </View>
          ) : (
            <View className="absolute right-2 top-2">
              <EyeSlashIcon
                size={30}
                color="black"
                onPress={() => setVisible(false)}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          className="p-2 mx-auto bg-red-600 w-full items-center rounded-lg mt-20"
          onPress={handleSubmit}>
          <Text className="text-black">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
