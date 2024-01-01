import {useSelector} from "react-redux"
import { View, Text,ScrollView,StyleSheet,FlatList,TouchableOpacity } from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context"
import {CurrencyDollarIcon,ListBulletIcon,ArrowsPointingOutIcon} from "react-native-heroicons/outline"
export default function Overview() {
    const products = useSelector((state)=>state.products.products)
    const data = [
        { id: '1', name: 'Item 1', quantity: 5, price: 10 },
        { id: '2', name: 'Item 2', quantity: 3, price: 15 },
        { id: '3', name: 'Item 3', quantity: 2, price: 20 },
        // Add more data as needed
      ];
      const renderTableRow = ({ item }) => (
        <View style={styles.tableRow}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{item.quantity}</Text>
          <Text style={styles.cell}>{item.price}</Text>
        </View>
      );
  return (
    <SafeAreaView className="w-[80%] bg-white h-screen right-0 absolute mb-5">
        <ScrollView showsVerticalScrollIndicator={false} >
      <Text className="text-blue-700 font-bold mt-3 border-b w-[85%] mx-auto text-center text-2xl tracking-[2px]">Overview</Text>

      <View className="bg-neutral-200 p-3 mt-5 w-[75%] mx-auto shadow-lg rounded-md relative">
        <View>
            <Text className="text-white text-2xl ml-7">
                Shop Total Earnings
            </Text>
            <Text className=" text-red-400 mt-3 text-2xl">
                Ksh 13000
            </Text>
        </View>
        <View className="absolute top-9 left-2">
            <CurrencyDollarIcon size={30} color='black' />
        </View>
      </View>
      <View className="bg-neutral-200 p-3 mt-5 w-[75%] mx-auto shadow-lg rounded-md">
        <View>
            <Text className="text-white text-2xl ml-7">
               Shop All Orders
            </Text>
            <Text className=" text-red-400 my-2 text-2xl text-center">
                8
            </Text>
            <TouchableOpacity>
                <Text className="text-green-400">View Orders</Text>
            </TouchableOpacity>
        </View>
        <View className="absolute top-9 left-2">
            <ListBulletIcon size={30} color='black' />
        </View>
      </View>
      <View className="bg-neutral-200 p-3 mt-5 w-[75%] mx-auto shadow-lg rounded-md">
        <View>
            <Text className="text-white text-2xl ml-7">
                Shop All Products
            </Text>
            <Text className=" text-red-400 my-2 text-2xl text-center">
                {products.products.length}
            </Text>
            <TouchableOpacity>
                <Text className="text-green-400">View Products</Text>
            </TouchableOpacity>
        </View>
        <View className="absolute top-9 left-2">
            <ArrowsPointingOutIcon size={30} color='black' />
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-black text-2xl tracking-[2px] text-center ">Latest Orders</Text>
        <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell} className="text-black">Name</Text>
        <Text style={styles.headerCell} className="text-black">Quantity</Text>
        <Text style={styles.headerCell} className="text-black">Price</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderTableRow}
        keyExtractor={(item) => item.id}
        className="text-black"
      />
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
  