import {View,Text} from "react-native";
import React from "react";
import {StarIcon} from "react-native-heroicons/solid"
const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <StarIcon
          key={i}
          size={15}
          color="#f6b100"
          className="mr-1 cursor-pointer"
        />
      );
    } else{
    stars.push(  <StarIcon key={i} size={15} color="#0000004b" className="mr-1" />)
    }
    if(rating %1 !== 0){
      stars[Math.floor(rating)] = <StarIcon key={i} size={15} color="#f6b100" />
    }
  }
  return <View className="flex" style={{display:'flex',flexDirection:'row'}}><Text> {stars}</Text></View>;
};

export default Ratings;
