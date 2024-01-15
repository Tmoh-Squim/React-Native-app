import {useSelector} from "react-redux"
import { View, Text,ScrollView,StyleSheet,FlatList,TouchableOpacity,Dimensions} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context"
import {CurrencyDollarIcon,ListBulletIcon,ArrowsPointingOutIcon,ChevronLeftIcon} from "react-native-heroicons/outline"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {useNavigation} from "@react-navigation/native"
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
      const navigation = useNavigation()
  return (
    <SafeAreaView className="w-[80%] bg-white h-screen right-0 absolute mb-5">
          <TouchableOpacity className="px-4 mt-2" onPress={()=>navigation.goBack()}>
          <ChevronLeftIcon size={30} color='black' />
          </TouchableOpacity>
      <Text className="text-blue-700 font-bold border-b w-[85%] mx-auto text-center text-2xl tracking-[2px]">Overview</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
      datasets: [
        {
          data: [
           1,2,3,4,5,6
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width/1.3}
    height={200}
    yAxisLabel="sales"
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "gray",
      
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
    className="mx-auto rounded-lg"
  />
        <View className="mt-5 bg-neutral-200 p-3 relative w-[75%] mx-auto shadow-lg rounded-md">
        <View className="ml-4">
            <Text className="text-white text-2xl ml-7">
                Shop Total Earnings
            </Text>
            <Text className=" text-red-400 mt-3 text-2xl">
                Ksh 13000
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
            <Text className=" text-red-400 my-2 text-2xl text-center">
                8
            </Text>
            <TouchableOpacity>
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
  