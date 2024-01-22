import {View, Text, ScrollView,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ratings from '../utils/helper';
import Countdown from "react-native-countdown-component"
import {SafeAreaView} from "react-native-safe-area-context"
import {BoltIcon} from "react-native-heroicons/outline"
import axios from "axios"
import {getAllEvents} from "../redux/events"
import {useDispatch} from "react-redux"
export default function Events() {
  const {events} = useSelector(state => state.events);
  const dispatch = useDispatch()
  const [currentTime,setCurrentTime] = useState(Math.floor(Date.now()/1000))
  const handleEvent = async (event) =>{
    try {
      const id = event._id
      await axios.delete(`https://squim-native-app.onrender.com/api/v2/event/delete-event/${id}`)
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
  console.log(currentTime)
  
  return (
    <SafeAreaView  className="px-0.5">
      {events?.events && events?.events.length !== 0 ? (
        <View>
          <View className="mt-1 mx-2">
            <Text className="text-black text-xl font-semibold">Fla<BoltIcon color='black' size={15}/>sh Sales</Text>
          </View>
          <View className="flex flex-row">
            {events?.events?.map((event, index) => {
              return (
                <>
                <View className="absolute top-2 left-2">
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
        showSeparator
      />
                  </View>
                <View className="w-[49%] relative  bg-white rounded-md mx-0.5" key={index}>
                  <Image
                    source={{uri: event.images[0]}}
                    className="w-full h-[140px] rounded-t-lg"
                  />
                  <View className="px-2">
                    <Text className="text-black text-[18px] my-1">
                      {event.name}{' '}
                    </Text>
                    <Text className="text-red-500  mb-1 font-semibold text-[18px]">
                    Ksh  {event.discountPrice} <Text className="text-black line-through text-[12px]">{event.originalPrice}</Text>
                    </Text>
                    <Ratings rating={event.ratings} />
                  </View>
                </View>
                </>
              );
            })}
             </View>
          </View>
      ) : null}
    </SafeAreaView>
  );
}
