import { View, Text } from "react-native";
import React from "react";
import {StripeProvider} from "@stripe/stripe-react-native"
import PaymentPopUp from "./PaymentPopUp";
const PaymentScreen = () => {
  return (
    <StripeProvider publishableKey="pk_test_51NWN51D0pcz30RoDjjHaUvRBUDJhjyDUKLJvf8Uzu1QWbd8dhA4Zbxqr7kKayuCH8z5HAvg9fztbKLcyBXeDFbsH00Xb5NFAKc">
        <PaymentPopUp />
    </StripeProvider>
  );
};

export default PaymentScreen;
