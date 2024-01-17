import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../redux/cart';
import {addToWishlist, removeFromWishlist} from '../redux/wishlist';
import {Picker} from '@react-native-picker/picker';
import Ratings from "../utils/helper"
const {width, height} = Dimensions.get('window');

export default function ProductDetails({route}) {
  const {product} = route.params;
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);
  const [color, setColor] = useState(product?.colors? product.colors[0] : '');
  const [size, setSize] = useState(product?.sisez? product.sizes[0] : '');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {wishlist} = useSelector(state => state.wishlist);

  const goBack = () => {
    navigation.goBack();
  };
  const [count, setCount] = useState(1);

  const handleAddToCart = product => {
    const item = {...product, cartQuantity: count,selectedSize:size,selectedColor:color};
    dispatch(addToCart(item));
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const handleAddToWishlist = product => {
    const item = {...product};
    dispatch(addToWishlist(item));
  };
  const handleRemoveFromWishlist = product => {
    dispatch(removeFromWishlist(product));
  };
  useEffect(() => {
    if (wishlist && wishlist.find(i => i._id === product?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [product, wishlist]);

  return (
    <SafeAreaView className="bg-white w-full h-screen pb-3">
      <ScrollView scrollEventThrottle={16}>
        <TouchableOpacity onPress={goBack} className="fixed">
          <View className="w-[30px] m-1 bg-yellow-400 rounded-md">
            <ChevronLeftIcon color="white" size="30" />
          </View>
        </TouchableOpacity>

        <View style={{marginTop: 1}}>
          <Image
            source={{uri: product.images[select]}}
            style={{width: width, height: height * 0.4}}
          />

          <View style={styles.smallImagesContainer}>
            {product?.images.map((item, index) => (
              <TouchableWithoutFeedback onPress={() => setSelect(index)}>
                <Image
                  key={index}
                  source={{uri: item}}
                  style={styles.smallImage}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>
          <Text className="text-black text-3xl ml-2 font-semibold mt-1 mb-2">
            {product.name}{' '}
          </Text>
          <Text className="text-neutral-700 ml-1 tracking-[1.5px] font-bold text-xl">
            {product.description}{' '}
          </Text>
          <View className="flex-1 w-full flex-row mt-2">
            <Text className="text-red-700 text-[18px] font-bold ml-2">
              Ksh {product.discountPrice}{' '}
            </Text>
            <Text className="text-neutral-600 line-through text-[10px]">
              Ksh {product.originalPrice}{' '}
            </Text>
          </View>
          <Text className="ml-1">
            <Ratings rating={product.ratings} />
          </Text>
          <View className="flex-1 flex-row mx-4 mt-2 mb-2 justify-between">
            <View className="flex-1 flex-row">
              <TouchableOpacity
                className="w-[32px] bg-green-600 h-[32px] justify-center border rounded-l-[6px]"
                onPress={handleDecrement}>
                <Text className="text-white text-center p-0 m-0 text-4xl">
                  -
                </Text>
              </TouchableOpacity>
              <Text className="w-[32px] bg-gray-200 text-black text-center p-0 m-0 text-xl h-[32px] justify-center border">
                {count}{' '}
              </Text>
              <TouchableOpacity
                className="w-[32px] bg-green-600 h-[32px] justify-center border rounded-r-[6px]"
                onPress={handleIncrement}>
                <Text className="text-white text-center p-0 m-0 text-2xl">
                  +
                </Text>
              </TouchableOpacity>
            </View>
            {click ? (
              <TouchableOpacity
                onPress={() => handleRemoveFromWishlist(product)}>
                <HeartIcon size="35" color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleAddToWishlist(product)}>
                <HeartIcon size="35" color="#0000004b" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="flex flex-row justify-between mx-2">
          {product.colors.length !== 0 && (
            <Text className="text-black text-[20px] font-bold ">
              Select color
            </Text>
          )}
          {product.sizes.length !== 0 && (
            <Text className="text-black text-[20px] font-bold ">
              Select size
            </Text>
          )}
        </View>
        <View className="flex flex-row justify-between">
          {product.colors.length !== 0 && (
            <View className="mt-1 mx-2 bg-blue-500 rounded-xl w-[42%]">
              <View>
                <Picker
                  selectedValue={color}
                  color="white"
                  onValueChange={color => setColor(color)}>
                  {product.colors &&
                    product.colors.map((i, index) => (
                      <Picker.Item label={i} value={i} key={index} />
                    ))}
                </Picker>
              </View>
            </View>
          )}
          {product?.sizes.length !== 0 && (
            <View className="mt-2 mx-2 bg-blue-500 rounded-xl w-[42%]">
              <Picker
                selectedValue={size}
                color="white"
                onValueChange={color => setSize(color)}>
                {product?.sizes?.length > 0 &&
                  product.sizes.map((i, index) => (
                    <Picker.Item label={i} value={i} key={index} />
                  ))}
              </Picker>
            </View>
          )}
        </View>

        <View className="flex-1 flex-row justify-between mt-2 mx-4">
          <TouchableOpacity className="px-4 py-2 align-middle justify-center bg-black rounded-[8px]">
            <Text className="text-white font-bold tracking-[1px]">Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 align-middle justify-center bg-black rounded-[8px]"
            onPress={() => handleAddToCart(product)}>
            <Text className="text-white font-bold tracking-[1px]">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
        <View className="my-5 px-1">
          {product?.images.map((item, index) => (
            <TouchableWithoutFeedback>
              <Image
                key={index}
                source={{uri: item}}
                className="w-full h-[200px] mt-2"
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
        <RelatedProducts product={product} />
      </ScrollView>
    </SafeAreaView>
  );
}

const RelatedProducts = ({product}) => {
  const products = useSelector(state => state.products.products);
  const navigation = useNavigation();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const filter = () => {
    const result = products?.products.filter(
      item => item.category === product.category,
    );
    setRelatedProducts(result);
  };

  useEffect(() => {
    filter();
  }, [product]);
  return (
    <SafeAreaView className="my-2">
      {relatedProducts.length !== 0 ? (
        <Text className="text-black text-3xl text-center my-3 font-bold">
          Related Products{' '}
        </Text>
      ) : null}
      {relatedProducts?.length !== 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mx-2 py-3 bg-neutral-300">
          {relatedProducts?.slice(0, 5).map(item => (
            <View
              key={item._id}
              style={{marginRight: 0, padding: 2}}
              className="mx-2  rounded-md bg-white">
              <View
                onPress={() =>
                  navigation.navigate('ProductDetails', {product: item})
                }>
                <Image
                  source={{uri: item.images[0]}}
                  className="w-full h-[130px] rounded-lg"
                />
              </View>
              <View className="px-2">
              <Text className="text-black text-[18px]">
                {item.name.length > 17
                  ? item.name.slice(0, 17) + '...'
                  : item.name}
              </Text>
              <Text className="text-red-600 text-[18px]">
              Ksh  {item.discountPrice}
              </Text>
              <Text className="text-red-600 text-[18px]">
              <Ratings rating={item.ratings} />
              </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

const styles = {
  smallImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    padding: 2,
  },
  smallImage: {
    width: width * 0.32,
    height: height * 0.15,
  },
};
