import {useSelector} from "react-redux"
import { View, Text,ScrollView,StyleSheet,FlatList,TouchableOpacity,Dimensions} from "react-native";
import React,{useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context"
import {CurrencyDollarIcon,ListBulletIcon,ArrowsPointingOutIcon,ChevronLeftIcon} from "react-native-heroicons/outline"
import {useNavigation} from "@react-navigation/native"
import {useDispatch} from "react-redux"
import {getAllOrders,TotalEarnigs} from "../../redux/order"
export default function Overview() {
    const products = useSelector((state)=>state.products.products)
    const {allOrders,totalEarnig} = useSelector((state)=>state.allOrders)
   
      const navigation = useNavigation()
      const dispatch = useDispatch()
      useEffect(() => {
        dispatch(TotalEarnigs())
        dispatch(getAllOrders())
      }, []);
      
  return (
    <SafeAreaView className="w-[80%] bg-white h-screen right-0 absolute mb-5">
          <TouchableOpacity className="px-4 mt-2" onPress={()=>navigation.goBack()}>
          <ChevronLeftIcon size={30} color='black' />
          </TouchableOpacity>
      <Text className="text-blue-700 font-bold w-[85%] mx-auto text-center text-2xl tracking-[2px]">Overview</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
  
        <View className="mt-5 bg-neutral-200 p-3 relative w-[75%] mx-auto shadow-lg rounded-md">
        <View className="ml-4">
            <Text className="text-white text-2xl ml-7">
                Shop Total Earnings
            </Text>
            <Text className=" text-red-400 mt-3 text-2xl">
                Ksh {totalEarnig}
            </Text>
        </View>
        <View className="absolute top-8 left-2">
            <CurrencyDollarIcon size={50} color='black' />
        </View>
      </View>
      <View className="bg-neutral-200 p-3 mt-5 w-[75%] mx-auto shadow-lg rounded-md">
        <View className="ml-4">
            <Text className="text-white text-2xl ml-7">
               Shop All Orders
            </Text>
            {
              allOrders && allOrders.length > 0 &&(
            <Text className=" text-red-400 my-2 text-2xl text-center">
                {allOrders.length}
            </Text>
            )
          }
          
            <TouchableOpacity onPress={()=>navigation.navigate('admin-orders')}>
                <Text className="text-green-400">View Orders</Text>
            </TouchableOpacity>
        </View>
        <View className="absolute top-8 left-2">
            <ListBulletIcon size={50} color='black' />
        </View>
      </View>
      <View className="bg-neutral-200 p-3 mt-5 w-[75%] mx-auto shadow-lg rounded-md mb-4">
        <View className="ml-4">
            <Text className="text-white text-2xl ml-7">
                Shop All Products
            </Text>
            <Text className=" text-red-400 my-2 text-2xl text-center">
               {
                products?.products  && products?.products?.length
               }
            </Text>
            <TouchableOpacity>
                <Text className="text-green-400">View Products</Text>
            </TouchableOpacity>
        </View>
        <View className="absolute top-8 left-2">
            <ArrowsPointingOutIcon size={50} color='black' />
        </View>
      </View>
    
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingTop: 10,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
    },
    cell: {
      flex: 1,
    },
  });
  