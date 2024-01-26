import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  CircleStackIcon,
  Cog8ToothIcon,
  ShoppingBagIcon,
  CubeIcon,
  FolderPlusIcon,
  ReceiptRefundIcon,
  DocumentPlusIcon,
  TagIcon,
  RectangleStackIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from "@react-navigation/native"

export default function Sidebar() {
    const navigation=useNavigation()
  return (
    <ScrollView className="w-[16%] left-0 bg-neutral-200 h-screen pl-3 pt-4">
      <TouchableOpacity>
        <View>
          <CircleStackIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('admin-orders')}>
        <View className="mt-10">
          <ShoppingBagIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="mt-10">
          <CubeIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('create-product')}>
        <View className="mt-10">
          <FolderPlusIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="mt-10">
          <RectangleStackIcon title="update" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="mt-10">
          <TagIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('admin-create-event')} >
        <View className="mt-10">
          <DocumentPlusIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('admin-order-refund')}>
        <View className="mt-10">
          <ReceiptRefundIcon size={30} color="black" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
