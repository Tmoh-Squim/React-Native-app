import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ratings from "../utils/helper"
const Products = () => {
  const {products,isLoading} = useSelector(state => state.products);
  const {user} = useSelector((state)=>state.user)

  const navigation = useNavigation();

  const [visibleProducts, setVisibleProducts] = useState(20); // Number of products to initially display
  const [loadingMore, setLoadingMore] = useState(false);

  const navigateToProductDetails = item => {
    
    navigation.navigate(`${user?.user && user?.user.role === 'Admin' ? 'product-update' : 'ProductDetails'}`, {product: item});
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10);
      setLoadingMore(false);
    }, 1000); // Simulating a delay for fetching more data; replace with your actual data fetching logic
  };

  return (
    <ScrollView style={styles.container} scrollEventThrottle={16}>
      <Text style={styles.title}>All Products</Text>

      <View style={styles.productsContainer}>
        {
          products?.products?.length > 0 ?(
            <>
            { products?.products.slice(0, visibleProducts).map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigateToProductDetails(item)}>
                <View style={styles.product}>
                  {item.images[0] ? (
                    <Image source={{uri: item.images[0]}} style={styles.imgStyle} />
                  ) : (
                    <Text>No Image Available</Text>
                  )}
                  <Text className="text-[19px] text-black">
                    {item.name.length < 20
                      ? item.name
                      : item.name.slice(0, 20) + '...'}
                  </Text>
                  <View className="flex-1 w-full flex-row mt-2">
                    <Text className="text-red-700 text-[18px] font-bold ml-2">
                      Ksh {item.discountPrice}{' '}
                    </Text>
                    <Text className="text-black line-through text-[10px]">
                      Ksh {item.originalPrice}{' '}
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="my-1 mx-1">
                    <Ratings rating={item.ratings} />
                    </Text>
                    <Text className=" text-green-500">
                      ({item.sold_out}) sold
                    </Text>
                    </View>
                  
                  
                </View>
              </TouchableWithoutFeedback>
            ))}
            </>
          ):(
            <View className="justify-center w-full py-5 items-center">
              <ActivityIndicator size='large' color='blue' />
            </View>
          )
        }
        
      </View>

      {
        products?.products?.length > 0 ? (
          <>
          {visibleProducts < products?.products.length && !loadingMore && (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
              <Text style={styles.loadMoreButtonText}>Load more products</Text>
            </TouchableOpacity>
          )}
    
          {loadingMore && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          )}
          </>
        ):null
      }
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  loadingIndicator: {
    marginTop: 2,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '50%', // Adjust the width based on your design
    marginBottom: 10,
    padding: 2,
  },
  imgStyle: {
    height: 150,
    width: '100%',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  brandTitle: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },
  loadMoreButton: {
    marginTop: 2,
    marginBottom: 0  ,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  loadMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Products;
