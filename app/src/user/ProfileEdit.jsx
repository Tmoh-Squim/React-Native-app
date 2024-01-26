import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Country, State} from 'country-state-city';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  UserIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import {useSelector} from 'react-redux';
import axios from 'axios';
export default function ProfileEdit() {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user.user);
  const [select, setSelect] = useState(1);
  const [name] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(`${user.phone}`);
  const [location, setLocation] = useState(location);
  const [district, setDistrict] = useState(district);
  const [county, setCounty] = useState(county);

  const handleEmail = text => {
    setEmail(text);
  };
  const handlePhone = text => {
    setPhone(text);
  };

  const handleLocation = text => {
    setLocation(text);
  };
  const handleDistrict = text => {
    setDistrict(text);
  };
  const handleCounty = text => {
    setCounty(text);
  };

  const handleUpdate = async () => {
    try {
      if (
        email === '' ||
        phone === '' ||
        county === '' ||
        district === '' ||
        location === ''
      ) {
        Alert.alert('All fields are required');
      }
      const deliveryDetails = [
        {
          county: county,
          district: district,
          location: location,
        },
      ];
      const token = await AsyncStorage.getItem('token')
      const res = await axios.put(
        `https://squim-native-app.onrender.com/api/v1/auth/update-user`,
        {user, email, phone, deliveryDetails},{
        headers:{
          'Authorization':token
        }
        }
      );
      Alert.alert(res.data.message);
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
    }
  };
  const details = () => {
    user?.deliveryDetails.length > 0 &&
      user?.deliveryDetails.map((item, index) => {
        return (
          setCounty(item.county),
          setDistrict(item.district),
          setLocation(item.location)
        );
      });
  };
  useEffect(() => {
    details();
  }, []);

  return (
    <SafeAreaView>
      <View
        className="w-full h-[61px] justify-center"
        style={{backgroundColor: '#88dae0'}}>
        <View className="mx-3  flex flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-white text-xl mx-auto">Edit Profile </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-3 mx-3 mb-10">
        <Text className="text-center text-xl font-bold text-black">
          Personal Details{' '}
        </Text>
        <View className="mt-2">
          <View className="mt-3 relative">
            <TextInput
              value={name}
              type="text"
              autoCapitalize="characters"
              className="border w-full rounded-[18px] pl-4 h-[45px] capitalize"
              editable={false}
              style={{color: 'black'}}
            />
            <View className="absolute right-3 top-3">
              <UserIcon size={20} color="gray" />
            </View>
          </View>
          <View className="absolute top-1 left-3 items-center bg-gray-100 px-3 ">
            <Text className="text-neutral-500 tracking-[1px] ">Full Name </Text>
          </View>
          <View>
            <View className="mt-8 relative">
              <TextInput
                value={email}
                keyboardType="email-address"
                className="border  w-full rounded-[18px] pl-4 h-[45px]"
                onChangeText={handleEmail}
                style={{color: 'black'}}
              />
              <View className="absolute right-3 top-3">
                <EnvelopeIcon size={20} color="gray" />
              </View>
            </View>
            <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
              <Text className="text-neutral-500 tracking-[1px] ">Email *</Text>
            </View>
          </View>

          <View>
            <View className="mt-8 relative">
              <TextInput
                value={phone}
                keyboardType="numeric"
                onChangeText={handlePhone}
                className="border  w-full rounded-[18px] pl-4 h-[45px]"
                style={{color: 'black'}}
              />
              <View className="absolute right-3 top-3">
                <DevicePhoneMobileIcon size={20} color="gray" />
              </View>
            </View>
            <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
              <Text className="text-neutral-500 tracking-[1px] ">
                Phone Number *
              </Text>
            </View>
          </View>

          <Text className="text-center text-[18px] font-semibold text-black mt-6">
            Select Gender{' '}
          </Text>
          <View className="items-center justify-center flex flex-row mt-4">
            <TouchableOpacity onPress={() => setSelect(1)}>
              <View
                className={`${select === 1 ? ' bg-orange-500' : null} mx-4`}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
            <Text className="text-black">Male </Text>
            <TouchableOpacity onPress={() => setSelect(2)}>
              <View
                className={`${select === 2 ? ' bg-orange-500' : null} mx-4`}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
            <Text className="text-black">Female </Text>
          </View>

          <Text className="text-center text-xl font-bold text-black mt-6">
            Delivery Details{' '}
          </Text>
          <View>
            <View className="mt-6 relative">
            <View className="border rounded-xl  mt-3 h-[45px] justify-center px-2 ">
                <Picker
                  selectedValue={county }
                  onValueChange={item => setCounty(item)}>
                  {State && 
                    State.getStatesOfCountry('KE').map(item => (
                      <Picker.Item
                        value={item.name}
                        label={item.name}
                        key={item.isoCode}
                        color="black"
                        style={{width: '50%'}}
                      />
                    ))}
                </Picker>
              </View>
            </View>
            <View className="absolute top-8 left-3 items-center bg-gray-100 px-3 ">
              <Text className="text-neutral-500 tracking-[1px] ">County *</Text>
            </View>
            <View>
              <View className="mt-8 relative">
                <TextInput
                  value={district}
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
                  onChangeText={handleDistrict}
                  style={{color: 'black'}}
                />
              </View>
              <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
                <Text className="text-neutral-500 tracking-[1px] ">
                  District *
                </Text>
              </View>
            </View>
            <View>
              <View className="mt-8 relative">
                <TextInput
                  value={location}
                  className="border  w-full rounded-[18px] pl-4 h-[45px]"
                  onChangeText={handleLocation}
                  style={{color: 'black'}}
                />
              </View>
              <View className=" absolute top-6  left-3 items-center bg-gray-100 px-2 ">
                <Text className="text-neutral-500 tracking-[1px] ">
                  Exact Location *
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="mt-10 w-[90%] mx-auto py-3 mb-10 rounded-xl items-center"
          style={{backgroundColor: 'orange'}}
          onPress={handleUpdate}>
          <Text className="text-white font-bold tracking-[1px] text-[19px]">
            Update{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
