import { View, Text,ScrollView,TochableWithoutFeedack,TouchableOpacity } from "react-native";
import React,{useState} from "react";
import {ArrowLeftIcon,ChevronDownIcon,ChevronUpIcon} from "react-native-heroicons/outline"
import {useNavigation} from "@react-navigation/native"
export default function FAQ() {
    const [active,setActive] = useState(false)
    const navigation = useNavigation()
  return (
    <ScrollView className="bg-neutral-200 px-2">
      <View>
      <View className="mx-2 mt-2  flex flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ArrowLeftIcon size={23} color="black" />
          </TouchableOpacity>
        </View>
        <View className="mt-0">
        <Text className="text-xl text-black text-center">
            Frequent Asked Questions
        </Text>
        </View>
        <View className="mt-3">
        <View>
            <TouchableOpacity className="p-2 rounded-md justify-between flex flex-row bg-neutral-400" onPress={()=>setActive(1)}>
                <Text className="text-black text-[18px]">
                    Do you offer free delivery?
                </Text>
                {
                    active === 1 ? (
                        <ChevronUpIcon color="black" size={20} />
                    ):(
                        <ChevronDownIcon color="black" size={20} />
                    )
                }
            </TouchableOpacity>
            {
                active === 1 &&(
                <Text className="text-black mt-1 text-[18px]">
                    Yes we we offer free delivery within some counties i.e Kiambu,Embu
                </Text>
                )
            }
        </View>
        <View>
            <TouchableOpacity className="p-2 mt-2 rounded-md justify-between flex flex-row bg-neutral-400" onPress={()=>setActive(5)}>
                <Text className="text-black text-[18px]">
                    Do you offer discount?
                </Text>
                {
                    active === 5 ? (
                        <ChevronUpIcon color="black" size={20} />
                    ):(
                        <ChevronDownIcon color="black" size={20} />
                    )
                }
            </TouchableOpacity>
            {
                active === 5 &&(
                <Text className="text-black mt-1 text-[18px]">
                    Yes we we offer discount for orders above Ksh 5000
                </Text>
                )
            }
        </View>
        <View>
            <TouchableOpacity className="p-2 mt-2 rounded-md justify-between flex flex-row bg-neutral-400" onPress={()=>setActive(2)}>
                <Text className="text-black text-[18px]">
                    Can i cancel the order once placed?
                </Text>
                {
                    active === 2 ? (
                        <ChevronUpIcon color="black" size={20} />
                    ):(
                        <ChevronDownIcon color="black" size={20} />
                    )
                }
            </TouchableOpacity>
            {
                active === 2 &&(
                <Text className="text-black mt-1 text-[18px]">
                    Order can't be canceled once placed but you can change the order
                </Text>
                )
            }
        </View>
        <View>
            <TouchableOpacity className="p-2 mt-2 rounded-md justify-between flex flex-row bg-neutral-400" onPress={()=>setActive(3)}>
                <Text className="text-black text-[18px]">
                    How can i contact you?
                </Text>
                {
                    active === 3 ? (
                        <ChevronUpIcon color="black" size={20} />
                    ):(
                        <ChevronDownIcon color="black" size={20} />
                    )
                }
            </TouchableOpacity>
            {
                active === 3 &&(
                    <View className="mt-1">
                <Text className="text-black text-[18px]">
                    You can contact us through phone, email or whatsapp
                </Text>
                <Text className="text-black text-[18px]">
                    Phone: +254748143442
                </Text>
                <Text className="text-black text-[18px]">
                    Email: squimstech@gmail.com
                </Text>
                </View>
                )
            }
        </View>
        <View>
            <TouchableOpacity className="p-2 mt-2 rounded-md justify-between flex flex-row bg-neutral-400" onPress={()=>setActive(4)}>
                <Text className="text-black text-[18px]">
                    Can i refund an order?
                </Text>
                {
                    active === 4 ? (
                        <ChevronUpIcon color="black" size={20} />
                    ):(
                        <ChevronDownIcon color="black" size={20} />
                    )
                }
            </TouchableOpacity>
            {
                active === 4 &&(
                    <View className="mt-1">
                <Text className="text-black text-[18px]">
                    You can go to your profile and on orders details screen you will see a Refund button upon a delivered order
                </Text>
                <Text className="text-red-500 text-[18px]">
                    NB: orders are only refundable upon 7days after delivery
                </Text>
                </View>
                )
            }
        </View>
        </View>
      </View>
    </ScrollView>
  );
}
