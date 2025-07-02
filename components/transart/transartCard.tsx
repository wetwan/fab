import { Order } from "@/types/type";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface transactionProp {
  transaction: Order;
}



const TransartCard = ({ transaction }: transactionProp) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(transact)/[transartId]",
          params: {
            transactionId: transaction?.id,
            transartId: transaction?.id,
          },
        })
      }
      style={[
        styles.container,
        { borderColor: transaction.status === "completed" ? "#08aa00" : "red" },
      ]}
    >
      {transaction.status === "completed" ? (
        <Image
          source={require("../../assets/images/check.png")}
          width={30}
          height={30}
          style={{ height: 45, width: 45 }}
        />
      ) : (
        <Image
          source={require("../../assets/images/delete-button.png")}
          width={30}
          height={30}
          style={{ height: 45, width: 45 }}
        />
      )}

      <Text style={[styles.basicText]}>
        {transaction.orderTime?.seconds &&
          new Date(transaction.orderTime.seconds * 1000).toLocaleDateString()}
      </Text>
      <View style={[styles.basicView]}>
        <FontAwesome6 name="naira-sign" size={10} />
        <Text style={[styles.basicText]}> {transaction.totalAmount / 100}</Text>
      </View>

      <Text
        style={[
          styles.basicText,
          styles.box,
          {
            borderColor: transaction.status === "completed" ? "#08aa00" : "red",
          },
        ]}
      >
        {transaction.items?.length}
      </Text>
      <Text
        style={[
          styles.basicText,
          { color: transaction.status === "completed" ? "#08aa00" : "red" },
        ]}
      >
        {transaction.status}
      </Text>
    </Pressable>
  );
};

export default TransartCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    marginBlock: 10,
    borderWidth: 1,
    paddingBlock: 10,
    padding: 15,
    borderRadius: 5,
    borderColor: "#08aa00",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "blue",
  },
  basicText: {
    fontFamily: "outfit",
    fontSize: 13,
    textTransform: "capitalize",
  },
  basicView: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: 6,
    borderWidth: 1,
    textAlign: "center",
    height: 30,
    width: 30,
    fontFamily: "outfit-bold",
  },
});
