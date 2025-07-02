/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Addcard = ({ setCards, cartData, setCartData }: any) => {
  const { user } = useUser();
  
  const [card, setCard] = useState({
    cardNumber: "",
    expireNumber: "",
    cssNunmber: "",
  });
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);

  const API_URL = "https://localhost:8080";

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Fab",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,

      defaultBillingDetails: {
        name: user?.fullName || "",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const handleContact = () => {
    if (!card.cardNumber || !card.cssNunmber || !card.expireNumber) {
      Alert.alert("Please fill all the flied");
    }
    setCards(false);
  };

  useEffect(() => {
    setCartData({ ...cartData, card });
  }, [card]);

  return (
    <View style={[styles.container]}>
      <Pressable
        style={{
          position: "absolute",
          top: 1,
          right: 1,
          borderWidth: 2,
          height: 30,
          width: 30,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "red",
          borderRadius: 20,
        }}
        onPress={() => setCards(false)}
      >
        <Text
          style={[
            styles.basicText,
            {
              textAlign: "center",
              color: "red",
              fontFamily: "outfit-bold",
              fontSize: 16,
            },
          ]}
        >
          x
        </Text>
      </Pressable>
      <Image
        source={require("../../assets/images/logo.png")}
        height={30}
        width={30}
        style={styles.logo}
      />
      <View
        style={{
          gap: 5,
          flex: 1,
          marginBottom: 10,
        }}
      >
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", textAlign: "center" },
          ]}
        >
          {user?.fullName}
        </Text>
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", textAlign: "center" },
          ]}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.basicText,
            {
              fontFamily: "outfit-bold",
              textTransform: "capitalize",
              fontSize: 18,
            },
          ]}
        >
          contact info
        </Text>
        <TextInput
          style={[styles.input, {}]}
          placeholder="Card Number"
          keyboardType="phone-pad"
          value={card.cardNumber}
          onChangeText={(text) => setCard({ ...card, cardNumber: text })}
          placeholderTextColor={"#08aa00"}
        />
        <View
          style={[
            styles.basicView,
            { width: 300, justifyContent: "space-between", gap: 10 },
          ]}
        >
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="Cvc Number"
            keyboardType="number-pad"
            value={card.cssNunmber}
            onChangeText={(text) => setCard({ ...card, cssNunmber: text })}
            placeholderTextColor={"#08aa00"}
          />
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="House Number"
            keyboardType="number-pad"
            value={card.expireNumber}
            onChangeText={(text) => setCard({ ...card, expireNumber: text })}
            placeholderTextColor={"#08aa00"}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#08aa00",
          marginTop: 40,
          padding: 20,
          borderRadius: 4,
        }}
      >
        <Text
          style={[
            styles.basicText,
            {
              textTransform: "capitalize",
              textAlign: "center",
              color: "white",
            },
          ]}
          onPress={handleContact}
        >
          pay now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addcard;

const styles = StyleSheet.create({
  basicView: { flexDirection: "row", alignItems: "center" },
  container: {
    position: "absolute",
    top: "30%",
    left: "40%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    zIndex: 200,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 50,
    height: 50,
  },

  basicText: {
    fontFamily: "outfit",
    fontSize: 14,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderColor: "#08aa00",
    backgroundColor: "white",
    color: "#08aa00",
    fontFamily: "outfit",
    fontSize: 14,
    borderRadius: 3,
    marginTop: 10,
  },
});
