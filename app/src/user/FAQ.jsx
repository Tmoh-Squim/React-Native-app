import { View, Text,ScrollView,TochableWithoutFeedack,TouchableOpacity,Linking } from "react-native";
import React,{useState} from "react";
import {ArrowLeftIcon,ChevronDownIcon,ChevronUpIcon,ChatBubbleOvalLeftIcon} from "react-native-heroicons/outline"
import {PhoneIcon} from "react-native-heroicons/solid"
import {useNavigation} from "@react-navigation/native"
export default function FAQ() {
    const [active,setActive] = useState(false)
    const navigation = useNavigation()
  return (
    <ScrollView className="bg-white">
      <View>
      <View className="px-2 bg-neutral-200 py-2 flex flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ArrowLeftIcon size={23} color="black" />
          </TouchableOpacity>
        </View>
        <View className="bg-neutral-200 p-2 wfull">
            <TouchableOpacity className="bg-green-500 justify-center items-center py-2 px-3 rounded-lg" onPress={()=>Linking.openURL('https://wa.me/+254748143442')}>
                <Text className="text-white">
                    Chat with our support team on Whatsapp
                </Text>
                <Text className="text-white text-2xl mt-1"><ChatBubbleOvalLeftIcon size={28} color='white'/> 0748143442</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" bg-gray-600 py-2 items-center px-3 my-2.5 rounded-lg" onPress={()=>Linking.openURL('tel:+254748143442')}>
                <Text className="text-white">
                    Need help? Call us for assistance
                </Text>
                <Text className="text-white text-2xl mt-1"><PhoneIcon size={28} color='white'/> 0748143442</Text>
            </TouchableOpacity>
        </View>
        <View className="px-2">
        <View className="mt-4 px-5">
        <Text className="text-3xl font-semibold text-black">
            Frequently Asked Questions
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
                    Phone: <Text onPress={()=>Linking.openURL('tel:254748143442')}>+254748143442</Text>
                </Text>
                <Text className="text-black text-[18px]">
                    Whatsapp: <Text onPress={()=>Linking.openURL('https://wa.me/+254748143442')}>+254748143442</Text>
                </Text>
                <Text className="text-black text-[18px]">
                    Email: <Text onPress={()=>Linking.openURL('mailto:squimstech@gmail.com')}>squimstech@gmail.com</Text>
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
      </View>
    </ScrollView>
  );
}
