import {View, Text, TouchableOpacity, TextInput, Alert,ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EyeSlashIcon, EyeIcon,ChevronLeftIcon} from 'react-native-heroicons/outline';
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone,setPhone] = useState()
  const [visible, setVisible] = useState(false);

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
      const data = {name,email,phone, password};
      if (password.length < 4 || password.length === '') {
        Alert.alert('password must be at least 4 characters');
        return
      }
      const response = await axios.post(
        'https://squim-native-app.onrender.com/api/v1/auth/register',
        data,
      );
      console.log('res', response.data);
      if(response.success){
        navigation.navigate('login');
      }
      else{
        return
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView className="px-3 mt-4 h-screen">
       <TouchableOpacity className="mt-3" onPress={()=>navigation.goBack()}>
            <ChevronLeftIcon size={30} color='black' />
        </TouchableOpacity>
      <View className="mt-5">
        <View className="my-5">
          <Text className="text-black text-2xl font-bold text-center ">
            Create New Account{' '}
          </Text>
        </View>
        <View>
        <Text className="text-black my-2">Input full name:</Text>
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={name}
            onChangeText={handleName}
            placeholder="Enter your full name"
            placeholderTextColor="green"
          />
        </View>
        <View className="my-4">
        <Text className="text-black my-2">Input your email address:</Text>
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={email}
            onChangeText={handleEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            placeholderTextColor="green"
          />
        </View>

        <View className="my-4">
        <Text className="text-black my-2">Input phone number:</Text>
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={phone}
            onChangeText={handlePhone}
            keyboardType='numeric'
            placeholder="Enter your phone number"
            placeholderTextColor="green"
          />
        </View>

        <View className="my-4 relative">
        <Text className="text-black my-2">Input your password:</Text>
          <TextInput
            className="text-black border px-3 rounded-lg"
            value={password}
            secureTextEntry={visible === true ? false : true}
            onChangeText={handlePassword}
            placeholder="Enter your password"
            placeholderTextColor="green"
          />
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

        <TouchableOpacity
          className="p-2 mx-auto bg-red-600 w-full items-center rounded-lg mt-6"
          onPress={handleSubmit}>
          <Text className="text-black text-2xl">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
