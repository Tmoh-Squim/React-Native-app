import {View, Text, ScrollView,Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ratings from '../utils/helper';
import Countdown from "react-native-countdown-component"
export default function Events() {
  const {events} = useSelector(state => state.events);
  const handleEvent = (event) =>{

  }
  return (
    <ScrollView showsHorizontalScrollIndicator={false} className="px-2">
      {events?.events && events?.events.length !== 0 ? (
        <View>
          <View className="mt-1">
            <Text className="text-black text-xl font-semibold">All Events</Text>
          </View>
          <View>
            {events?.events?.map((event, index) => {
              return (
                <>
                <View className="absolute top-2">
                  <Countdown until={270000} onFinish={()=>handleEvent(event)} />
                  </View>
                <View className="w-[50%] relative bg-white rounded-md" key={index}>
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
    </ScrollView>
  );
}
