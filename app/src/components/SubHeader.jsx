import {Text, StyleSheet} from 'react-native';
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
        user?.user && (<View>
          <Text style={styles.deliver}>
            Delivery to {user?.user?.name}
          </Text>
        </View>)
      }
      <Text style={styles.deliver}>Deliver to Kutus - Kirinyaga 897654</Text>
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
    fontSize: 13,
    color: '#2c4341',
    paddingHorizontal: 6,
  },
});

export default SubHeader;
