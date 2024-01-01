import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {SliderBox} from "react-native-image-slider-box"

function Slider() {
    const width = Dimensions.get('window').width;
    const slides = [
        "https://d326fntlu7tble.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
        "https://d326fntlu7tble.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
        "https://d326fntlu7tble.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
    ]
    return (
        <View style={{ flex: 1 }}>
            <SliderBox
            images={slides}
                autoplay
                circleLoop
                dotColor='green'
                inactiveDotColor='white'
                ImageComponentStyle={{width:width,height:width/5,borderRadius:15}}
                              
            />
        </View>
    );
}

export default Slider;