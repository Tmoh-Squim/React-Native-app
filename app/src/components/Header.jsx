import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
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
        <TouchableOpacity style={styles.inputBox} onPress={()=>navigation.navigate('SearchScreen')}>
          <View style={styles.row} >
            <TextInput
              placeholder="Search for product..."
              placeholderTextColor="#848484"
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
          <MagnifyingGlassIcon size='30' strokeWidth={2} color='black' />
         </TouchableOpacity>
        </TouchableOpacity>
        
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
