import { View, Text,Alert } from "react-native";
import {useStripe} from "@stripe/stripe-react-native"
import React,{useEffect} from "react";

const PaymentPopUp = ({route}) => {
    const {email,phone,amount} = route.params
    const stripe = useStripe()

    useEffect(() => {
      const handlePayment = async () =>{
        try {
            const response = await axios.post("https://squim-native-app.onrender.com/api/v1/payment/card-payment",{email:email,phone:phone,amount:amount},{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            
        } catch (error) {
            return Alert.alert("Something went wrong, try again later")
        }
      }
    }, []);
    
  return (
    <>
    </>
  );
};

export default PaymentPopUp;
