import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {useNavigation} from "@react-navigation/native"
import Ratings from "../utils/helper"
import {useDispatch} from "react-redux"
import {addToCart} from "../redux/cart"

const Deals = () => {
  const [data,setData] = useState([])
  const [product,setProduct] = useState([])
  const {products} = useSelector((state)=>state.products)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  
useEffect(() => {
   products?.products?.length >0 ? (
    setProduct(products.products)
  ):(
    setProduct([])
  )

}, [products]);
useEffect(() => {
  product?.length >0 ? (
    setData([...product].sort((a,b)=>b.sold_out - a.sold_out).slice(0,2))
  ):(
    setData([])
  )
}, [product]);
const handleBuyNow = (item) =>{
  const product = {...item,cartQuantity:1}
  dispatch(addToCart(product))
  navigation.navigate('delivery',{price:item.discountPrice})
}

  return (
    <>
    {
      data && data.length !==0 ? (
        <>
        <Text style={styles.title} className="mt-3">Recommended deal for you</Text>
      {
        data.map((item,index)=>(
          <View style={styles.container} key={index} >
            <TouchableOpacity onPress={()=>navigation.navigate('ProductDetails',{product:item})}>
            <Image source={{uri:item.images[0]}} style={styles.imgStyle} />
            </TouchableOpacity>
          <View style={styles.bottomSection}>
            <View style={styles.row}>
              <View style={styles.offDealBtn}>
                <Text style={styles.offDeal}>{Math.round((item.originalPrice-item.discountPrice)*5/100)} % off</Text>
              </View>
              <Text style={styles.deal}>Deal</Text>
            </View>
            <View style={styles.row}>
              <Text className="text-red-500 my-1 text-[20px] font-semibold">Ksh {item.discountPrice}</Text>
              <Text style={styles.mrp} className="text-black">M.R.P.</Text>
              <Text style={styles.actualPrice} className="text-black">Ksh {item.originalPrice}</Text>
            </View>
            <View className="flex flex-row"> 
              <Ratings rating={item.ratings} />
              <Text className="text-green-500 mx-1">
                ({item.sold_out}) sold
              </Text>
            </View>
            <Text style={styles.productName}>
              {item.name}
            </Text>

            <TouchableOpacity className="bg-black p-3 my-1 w-[35%] rounded-lg" onPress={()=>handleBuyNow(item)}>
              <Text className="text-white text-[18px] font-semibold">
                Buy Now
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.allDeals}>See all deals</Text>
          </View>
          </View >
        ))
      } 
      </>
      ):null
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 10,
  },
  imgStyle: {
    height: 250,
    width: '100%',
    marginVertical: 10,
  },
  bottomSection: {
    paddingHorizontal: 10,
  },
  offDealBtn: {
    backgroundColor: '#be0201',
    width: 60,
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
  },
  offDeal: {
    color: 'white',
    fontSize: 12,
  },
  deal: {
    color: '#be0201',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountPrice: {
    color: 'black',
    fontSize: 16,
    marginVertical: 5,
  },
  mrp: {
    fontSize: 10,
    marginHorizontal: 5,
  },
  actualPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  productName: {
    color: 'black',
    fontSize: 14,
  },
  allDeals: {
    color: '#017185',
    fontSize: 14,
    marginVertical: 10,
  },
});

export default Deals;
