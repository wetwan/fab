import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItem {
  $id: string;
  id: string;
  name: string;
  userId: string;
  quantity: number;
  imageUrl?: string;
  price: number;
  addedAt?: string;
}

type TotalPaymentProp = {
  cart: CartItem[];
  taxPriceOfCart: number
  totalPriceOfCart: number
};
const TotalPayment = ({ cart , taxPriceOfCart, totalPriceOfCart}: TotalPaymentProp) => {
  // const totalPriceOfCart = cart.reduce(
  //   (acc, item) => acc + item?.quantity * item.price,
  //   0
  // );
  // const taxPriceOfCart = (4 / 100) * totalPriceOfCart;
  const ammountbepaid = taxPriceOfCart + totalPriceOfCart;
  return (
    <View
      style={{
        gap: 10,
        position: "fixed",
        bottom: 10,
        zIndex: 50,
        backgroundColor: "pink",
        paddingTop: 10,
        borderRadius: 7,

        marginHorizontal: 20,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          gap: 10,
          paddingInline: 10,
          padding: 5,
          borderColor: "grey",
          borderRadius: 7,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.text,
              { color: "#228B22", fontFamily: "outfit-bold" },
            ]}
          >
            total of cart
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6 name="naira-sign" size={10} />
            <Text style={[styles.text]}>: {totalPriceOfCart}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              styles.text,
              { color: "#228B22", fontFamily: "outfit-bold" },
            ]}
          >
            tax of cart
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6 name="naira-sign" size={10} />
            <Text style={[styles.text]}>: {taxPriceOfCart}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "gray" }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.text,
              { color: "#228B22", fontFamily: "outfit-bold", marginLeft: 20 },
            ]}
          >
            +
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6 name="naira-sign" size={10} />
            <Text style={[styles.text]}>: {ammountbepaid}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.button]} activeOpacity={5}>
        <Text
          style={[styles.text, { color: "white", fontFamily: "outfit-bold" }]}
        >
          make to payment
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "5",
          marginHorizontal: 20,
          marginBottom: 5,
        }}
      >
        <Ionicons name="information-circle-outline" size={13} color="grey" />
        <Text style={[styles.text, { textAlign: "left", color: "grey" }]}>
          note that payemnt for logistics will be make on devilvery
        </Text>
      </View>
    </View>
  );
};

export default TotalPayment;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#08aa00",
    marginHorizontal: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  text: {
    fontFamily: "outfit-medium",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
