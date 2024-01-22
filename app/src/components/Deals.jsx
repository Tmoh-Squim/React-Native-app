import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {useNavigation} from "@react-navigation/native"
import RecommendProduct from '../assets/recommend.jpg';

const Deals = () => {
  const [data,setData] = useState([])
  const {products} = useSelector((state)=>state.products)
  const navigation = useNavigation()


useEffect(() => {
const allProductsData = products ? [...products] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
}, [products]);

  return (
    <>
    {
      data && data.length !==0 ? (
        <View>
      {
        data.map((item,index)=>(
          <View style={styles.container} key={index}>
          <Text style={styles.title}>Recommended deal for you</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('productDetails',{product:item})}>
          <Image source={{uri:item.images[1]}} style={styles.imgStyle} />
          <View style={styles.bottomSection}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.offDealBtn}>
                <Text style={styles.offDeal}>18% off</Text>
              </TouchableOpacity>
              <Text style={styles.deal}>Deal</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.discountPrice}>Ksh {item.discountPrice}</Text>
              <Text style={styles.mrp}>M.R.P.</Text>
              <Text style={styles.actualPrice}>Ksh {item.originalPrice}</Text>
            </View>
            <Text style={styles.productName}>
              {item.name}
            </Text>
            
            <Text style={styles.allDeals}>See all deals</Text>
          </View>
          </TouchableOpacity >
        </View> 
        ))
      } 
      </View>
      ):null
    }
    <View style={styles.container}>
      <Text style={styles.title}>Recommended deal for you</Text>
      <Image source={RecommendProduct} style={styles.imgStyle} />
      <View style={styles.bottomSection}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.offDealBtn}>
            <Text style={styles.offDeal}>18% off</Text>
          </TouchableOpacity>
          <Text style={styles.deal}>Deal</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.discountPrice}>Ksh 1,549.00</Text>
          <Text style={styles.mrp}>M.R.P.</Text>
          <Text style={styles.actualPrice}>Ksh 1895.00</Text>
        </View>
        <Text style={styles.productName}>
          Nykaa Face Wash Gentle Skin Cleanser for all skin type
        </Text>
        <Text style={styles.allDeals}>See all deals</Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
