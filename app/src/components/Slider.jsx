import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

function Slider() {
  const width = Dimensions.get('window').width;
  const date = new Date();
  console.log(date);
  const slides = [
    'https://res.cloudinary.com/dvsmxvdtr/image/upload/v1699381129/lw7gsg4ucidppbjdjolz.jpg',
    'https://res.cloudinary.com/dvsmxvdtr/image/upload/v1699381765/dghrf19rxcjnxiu9cjuh.jpg',
    'https://res.cloudinary.com/dvsmxvdtr/image/upload/v1699360405/vpt5qa1oc4l0xjrea192.jpg',
    'https://res.cloudinary.com/dvsmxvdtr/image/upload/v1699611422/xjyjsam2d5t5vgrnx3cu.jpg',
    'https://res.cloudinary.com/dvsmxvdtr/image/upload/v1699612357/npys0xmi0isqcxlf4xco.jpg',
  ];
  return (
    <View>
      <View>
        <Text className="text-green-500 absolute text-xl z-30 top-3 right-2">
          <Text className="w-full h-full bg-black items-center rounded-xl mx-1">
            {date.getHours()}
          </Text>
          :
          <Text className="w-full h-full bg-black items-center mx-1">
            {date.getMinutes()}
          </Text>
          :
          <Text className="w-full h-full bg-black items-center mx-1">
            {date.getSeconds()}
          </Text>
        </Text>
      </View>
      <View className=" flex-1 items-center">
        <SliderBox
          images={slides}
          autoplay
          circleLoop
          dotColor="green"
          inactiveDotColor="white"
          ImageComponentStyle={{
            width: '98%',
            height: width / 2,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      </View>
    </View>
  );
}

export default Slider;
