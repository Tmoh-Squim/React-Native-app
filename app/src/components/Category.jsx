import { useSelector,useDispatch } from "react-redux";
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Categories} from "../data/Categories"
const Category = () => {
  const navigation = useNavigation();


  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.conatiner}>
      {Categories?.length &&
        Categories.map((item,index) => (
          <View>
          <TouchableOpacity
            key={index}
            onPress={()=>navigation.navigate('SearchScreen')}
            style={styles.category}>
            <Image
              source={item.image}
              style={styles.imgStyle}
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>

          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: '#FFFFFFFF',
    padding: 10,
  },
  imgStyle: {
    height: 50,
    width: 50,
  },
  title: {
    fontSize: 10,
    color: '#2c4341',
  },
  category: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export default Category;
