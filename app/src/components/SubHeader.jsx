import {Text, StyleSheet,View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MapPinIcon} from "react-native-heroicons/outline"
import {useSelector} from "react-redux"
const SubHeader = () => {
  const {user} = useSelector((state)=>state.user)
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#bbe8ef', '#bdeee9', '#c3f1e3']}
      style={styles.container}>
      <MapPinIcon size={22} color='black' />
      {
        user?.user?.deliveryDetails.length > 0 ? (
        <>
        <View>
          {
            user?.user?.deliveryDetails.map((item,index)=>{
              return (
         <Text style={styles.deliver} key={index}>
            Delivery to  {item.county} | {item.district}  | {item.location}
          </Text>
             ) })
          }
        </View>
        </>
        ):(
          <>
      <Text style={styles.deliver}>Deliver to unknown destination</Text>
      </>
        )
      }
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliver: {
    fontSize: 14,
    color: '#2c4341',
    paddingHorizontal: 6,
  },
});

export default SubHeader;
