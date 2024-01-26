import {View, Text, ScrollView,Image,Dimensions} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ratings from '../utils/helper';
import Countdown from "react-native-countdown-component"
import {SafeAreaView} from "react-native-safe-area-context"
import {BoltIcon} from "react-native-heroicons/outline"
import axios from "axios"
import {getAllEvents} from "../redux/events"
import {useDispatch} from "react-redux"
import {useNavigation} from "@react-navigation/native"

const width = Dimensions.get('window').width
export default function Events() {
  const {events} = useSelector(state => state.events);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [currentTime,setCurrentTime] = useState(Math.floor(Date.now()/1000))
  const handleEvent = async (event) =>{
    try {
      const id = event._id
      await axios.delete(`https://squim-native-app.onrender.com/v2/event/delete-event/${id}`)
      dispatch(getAllEvents())
    } catch (error) {
      Alert.alert('Network error')
    }
  }
  useEffect(() => {
   const interval = setInterval(() => {
   setCurrentTime(prev => prev + 1)
   }, 1000);

   return () => clearInterval(interval)
  }, []);
  
  return (
    <SafeAreaView  className="px-0.5">
      {events?.events && events?.events.length !== 0 ? (
        <>
          <View className="mt-1 mx-2">
            <Text className="text-black text-xl font-semibold">Fla<BoltIcon color='black' size={15}/>sh Sales</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="w-full">
            {events?.events?.map((event, index) => {
              return (
                <>
                <View className=" relative bg-white rounded-md mx-0.5 mr-1" key={index} style={{width:width/2.2}}>
                <Countdown
        size={10}
        until={event.expirationTime - currentTime}
        onFinish={() => handleEvent(event)}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 1, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        style={{position: 'absolute', top: 2, left: 2, zIndex: 30}}
        showSeparator
      />
                  <Image
                    source={{uri: event.images[0]}}
                    onPress={()=>navigation.navigate('ProductDetails',{product:event})}
                    className="w-full h-[140px] rounded-t-lg"
                  />
                  <View className="px-2">
                    <Text className="text-black text-[18px] my-1">
                      {event.name}{' '}
                    </Text>
                    <Text className="text-red-500  mb-1 font-semibold text-[18px]">
                    Ksh  {event.discountPrice} <Text className="text-black line-through text-[12px]">Ksh {event.originalPrice}</Text>
                    </Text>
                    <Ratings rating={event.ratings} />
                  </View>
                </View>
                </>
              );
            })}
             </ScrollView>
          </>
      ) : null}
    </SafeAreaView>
  );
}
