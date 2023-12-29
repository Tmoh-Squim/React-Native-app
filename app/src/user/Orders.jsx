import { View, Text } from "react-native";
import React,{useEffect} from "react";
import {useSelector,useDispatch} from "react-redux"
import {getUserOrders} from "../redux/order"
import {SafeAreaView} from "react-native-safe-area-context"
export default function Orders() {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user)
    const {orders} = useSelector((state)=>state.orders.orders)
    console.log('user_orders',orders)


    useEffect(()=>{
       dispatch(getUserOrders(user?.user?._id))
    },[id,dispatch])
  return (
    <SafeAreaView>
    </SafeAreaView>
  );
}
