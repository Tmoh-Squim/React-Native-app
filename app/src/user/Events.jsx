import {View, Text, ScrollView,Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ratings from '../utils/helper';
import Countdown from "react-native-countdown-component"
import {SafeAreaView} from "react-native-safe-area-context"
export default function Events() {
  const {events} = useSelector(state => state.events);
  const handleEvent = (event) =>{

  }
  return (
    <SafeAreaView  className="px-2">
      {events?.events && events?.events.length !== 0 ? (
        <View>
          <View className="mt-1">
            <Text className="text-black text-xl font-semibold">All Events</Text>
          </View>
          <View className="flex flex-row">
            {events?.events?.map((event, index) => {
              return (
                <>
                <View className="absolute top-2 left-2">
                <Countdown
        size={10}
        until={event.expirationTime}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 1, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
                  </View>
                <View className="w-[50%] relative  bg-white rounded-md mx-1" key={index}>
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
