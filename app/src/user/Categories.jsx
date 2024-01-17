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
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import Ratings from "../utils/helper"
import {Categories} from '../data/Categories';

export default function Category() {
  const products = useSelector(state => state.products.products);

  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState([]);

  const filtered = () => {
    const result = products?.products && products?.products.filter(
      product => product.category === category,
    );
    setFilter(result);
  };

  const handleCategoryChange = item => {
    setCategory(item.title);
    filtered();
  };

  const filteredProducts =
    searchQuery !== ''
      ? products?.products && products.products.filter(product =>
          product.name
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase() ||
                product.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            ),
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
            <TouchableWithoutFeedback
              onPress={() => handleCategoryChange(item)}>
              <View key={item.id} style={Styles.category} className="px-[0px]">
                <Image source={item.image} style={Styles.categoryImage} />

                <Text className="text-black">
                  {' '}
                  {item.title.length > 10
                    ? item.title.slice(0, 10) + '...'
                    : item.title}{' '}
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
          <Text className="text-black">
            {filteredProducts.length} Products found{' '}
          </Text>
          <View style={Styles.scrollViewImages} className="w-full">
            {filteredProducts.length !== 0 &&
              filteredProducts?.map(product => (
                
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ProductDetails', {product: product})
                  }>
                    <View className="w-[50%] p-1">
                  <Image
                    key={product._id}
                    source={{uri: product.images[0]}}
                    style={Styles.productImage}
                  />
                  <Text className="text-black my-1">
                    { product.name}
                  </Text>
                  <Text className="text-red-600 text-[18px]">
                   Ksh { product.discountPrice}
                  </Text>
                  <Text className="text-black">
                    <Ratings rating={product.ratings} />
                  </Text>

                  </View>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </ScrollView>
      ) : null}

      {/* filter by category ie mapping*/}
      {filter.length !== 0 ? (
        <ScrollView className=" bg-neutral-300 absolute top-0 px-1 left-0 right-0 h-screen">
          <View className="flex-1 flex-row justify-between mt-2">
            <TouchableOpacity onPress={() => setFilter([])}>
              <ChevronLeftIcon size={30} color="black" />
            </TouchableOpacity>
            <Text className="text-black">{filter.length} products found </Text>
          </View>
          <View style={Styles.scrollViewImages} className="w-full">
            {filter.length !== 0 &&
              filter?.map(product => (
                <View className="w-[48%] bg-gray-100 mx-0.5 rounded-md">
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('ProductDetails', {product: product})
                  }>
                    <View >
                      <View>
                  <Image
                    key={product._id}
                    source={{uri: product.images[0]}}
                    style={Styles.productImage}
                  />
                  </View>
                  <View className="px-2">
                  <Text className="text-black my-1">
                    { product.name}
                  </Text>
                  <Text className="text-red-600 text-[18px]">
                   Ksh { product.discountPrice}
                  </Text>
                  <Text className="text-black">
                    <Ratings rating={product.ratings} />
                  </Text>
                  </View>

                  </View>
                </TouchableWithoutFeedback>
                </View>
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
    width: '100%',
    height: 140,
    borderRadius: 4,
    marginBottom: 4,
    marginLeft: 0,
  },
});
