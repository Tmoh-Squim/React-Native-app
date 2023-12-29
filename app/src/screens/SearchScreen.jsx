import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from "react-native-heroicons/outline"

import {Categories} from '../data/Categories';

export default function SearchScreen() {
  const products = useSelector(state => state.products.products);
  console.log('products', products);

  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState([]);

  const filtered = () => {
    const result = products?.products.filter(
      product => product.category === category,
    );
    setFilter(result);
  };

  const handleCategoryChange = item => {
    setCategory(item.title);
    filtered();
  };

  console.log('filtered_pro', filter);

  const filteredProducts =
    searchQuery !== ''
      ? products.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.searchContainer}>
        <TextInput
          placeholder="Search for products..."
          placeholderTextColor="tomato"
          style={Styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <Text className="text-black text-3xl text-center">All Categories </Text>
      </View>
      <ScrollView
        contentContainerStyle={Styles.scrollViewContent}
        className="mx-2">
        {Categories?.slice(0, 12).map(item => (
          <View>
            <View key={item.id} style={Styles.category} className="px-[0px]">
              <TouchableOpacity onPress={() => handleCategoryChange(item)}>
                <Image source={item.image} style={Styles.categoryImage} />
              </TouchableOpacity>
              <Text className="text-black">
                {' '}
                {item.title.length > 10
                  ? item.title.slice(0, 10) + '...'
                  : item.title}{' '}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {filteredProducts.length !== 0 ? (
        <ScrollView className="px-1  absolute top-0 left-0 right-0 w-full h-screen bg-neutral-300">
          <View style={Styles.searchContainer} className="!px-0">
            <TextInput
              placeholder="Search for products..."
              placeholderTextColor="tomato"
              style={Styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <Text className="text-black">{filteredProducts.length} Products found </Text>
          <View style={Styles.scrollViewImages}>
            {filteredProducts.length !== 0 &&
              filteredProducts?.map(product => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ProductDetails', {product: product})
                  }>
                  <Image
                    key={product._id}
                    source={{uri: product.images[0]}}
                    style={Styles.productImage}
                  />
                </TouchableWithoutFeedback>
              ))}
          </View>
        </ScrollView>
      ) : null}

      {/* filter by category ie mapping*/}
      {filter.length !== 0 ? (
        <ScrollView className=" bg-neutral-300 absolute top-0 px-1 left-0 right-0 h-screen">
        <View className="flex-1 flex-row justify-between mt-2">
        <TouchableOpacity onPress={()=>setFilter([])}>
        <ChevronLeftIcon size={30} color='black' />
        </TouchableOpacity>
          <Text className="text-black">{filter.length} products found </Text>
          </View>
          <View style={Styles.scrollViewImages}>
            {filter.length !== 0 &&
              filter?.map(product => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ProductDetails', {product: product})
                  }>
                  <Image
                    key={product._id}
                    source={{uri: product.images[0]}}
                    style={Styles.productImage}
                  />
                </TouchableWithoutFeedback>
              ))}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  searchContainer: {
    margin: 16,
  },
  searchInput: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    width: '100%',
    paddingLeft: 10,
    color: 'tomato',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  category: {
    marginBottom: 16,
  },
  categoryImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  scrollViewImages: {
    marginTop: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productImage: {
    width: '49.5%',
    height: 150,
    borderRadius: 10,
    marginBottom: 4,
    marginLeft: 0,
  },
});
