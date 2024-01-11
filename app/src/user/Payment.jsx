import { View, Text } from "react-native";
import React from "react";
import {useSelector,useDispatch} from "react-redux"

export default function Payment({route}) {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user)
    const {cart} = useSelector((state)=>state.cart)
  return (
    <View>
      
    </View>
  );
}
