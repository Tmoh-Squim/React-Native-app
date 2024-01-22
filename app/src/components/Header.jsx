import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {PhoneIcon} from "react-native-heroicons/solid"
import {useNavigation} from "@react-navigation/native"

const Header = () => {
  const navigation = useNavigation()

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#88dae0', '#98e1d6', '#9ee4d4']}
        style={styles.container}>
          <View className="justify-between w-full px-2 flex flex-row">
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
          <MagnifyingGlassIcon size='28' strokeWidth={2} color='black' />
         </TouchableOpacity>
         </View>
         <View>
              <TouchableOpacity  onPress={()=>navigation.navigate('faq')}>
                <PhoneIcon size={28} color='black'  />
              </TouchableOpacity>
            </View>
            </View>
        
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a1bcc0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    padding: 8,
  },
});

export default Header;
