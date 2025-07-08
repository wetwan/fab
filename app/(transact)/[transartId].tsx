import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { Order } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const TransartId = () => {
  const { transactionId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [transactionData, setTransactionData] = useState<Order>();
  const { user } = useUser();

  useEffect(() => {
    const getTransactionsData = async () => {
      if (!transactionId) {
        Alert.alert("Error", "No food item specified.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const docRef = doc(db, "transactions", transactionId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const order: Order = {
            id: docSnap.id,
            address: data.address,
            items: data.items ?? [],
            orderTime: data.orderTime,
            paymentIntentId: data.paymentIntentId,
            paymentStatus: data.paymentStatus,
            deliveryStatus: data.deliveryStatus,
            totalAmount: data.totalAmount ?? 0,
            userId: data.userId,
            phone: data.phone,
            AttendantName: data.AttendantName,
          };

          setTransactionData(order);
        } else {
          Alert.alert("Error", "Food item not found.");
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
        Alert.alert("Error", "Could not fetch food details.");
      } finally {
        setLoading(false);
      }
    };

    getTransactionsData();
  }, [transactionId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  if (!transactionId) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.basicText]}>
          Could not load transactions details.
        </Text>
      </View>
    );
  }

  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: Colors.red,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          width: "100%",
          paddingBlock: 30,
          paddingTop: 50,
          paddingInline: 20,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>
      <View style={[styles.container, {}]}>
        <View style={{ flexDirection: "row-reverse", gap: 10 }}>
          <View>
            <Text style={[styles.basicText]}>{user?.fullName}</Text>
            <Text style={[styles.basicText]}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
            <Text style={[styles.basicText]}>{transactionData?.phone}</Text>
            <Text style={[styles.basicText]}>
              transactions No : {transactionId}
            </Text>

            <Text style={[styles.basicText]}>
              {transactionData?.orderTime?.seconds &&
                new Date(
                  transactionData?.orderTime.seconds * 1000
                ).toLocaleDateString()}{" "}
              {transactionData?.orderTime?.seconds &&
                new Date(
                  transactionData?.orderTime.seconds * 1000
                ).toLocaleTimeString()}
            </Text>
          </View>

          <View>
            {transactionData?.paymentStatus === "completed" ? (
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
          </View>
        </View>
        <View
          style={[
            styles.basicView,
            {
              gap: 1,
              padding: 10,
              backgroundColor: "#08ac2f",
              marginTop: 20,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={[styles.basicText, { color: "white" }]}>
            totalAmount:{" "}
          </Text>
          <FontAwesome6 name="naira-sign" size={10} color={"balck"} />
          <Text
            style={[
              styles.basicText,
              { color: "#000", fontFamily: "outfit-medium" },
            ]}
          >
            {(transactionData?.totalAmount ?? 0) / 100}
          </Text>
        </View>
        <View
          style={[
            styles.basicView,
            {
              gap: 1,
              padding: 10,
              backgroundColor: "#08ac2f",
              marginTop: 20,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={[styles.basicText, { color: "white" }]}>
            processing Status:
          </Text>
          <Text
            style={[
              styles.basicText,
              { color: "#000", fontFamily: "outfit-medium" },
            ]}
          >
            {" "}
            {transactionData?.deliveryStatus}
          </Text>
        </View>

        <FlatList
          data={transactionData?.items}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: food }) => (
            <View style={[styles.foodItem, { gap: 5 }]}>
              <Image
                source={{ uri: food.imageUrl }}
                width={50}
                height={50}
                style={{ borderRadius: 40 }}
              />
              <View style={{ gap: 5 }}>
                <Text style={[styles.basicText, { color: "#fff" }]}>
                  {food.name}
                </Text>
                <Text style={[styles.basicText, { color: "#fff" }]}>
                  quantity: {food.quantity}
                </Text>
                <Text style={[styles.basicText, { color: "#fff" }]}>
                  price: {food.price}
                </Text>
                <Text style={[styles.basicText, { color: "#fff" }]}>
                  total: {food.price * food.quantity}
                </Text>
              </View>
            </View>
          )}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBlock: 15,

            padding: 10,
            borderRadius: 5,
            backgroundColor: Colors.gray,
          }}
        >
          <Image
            source={require("../../assets/images/circle.png")}
            width={30}
            height={30}
            style={{ height: 45, width: 45 }}
          />
          <View>
            <Text style={[styles.basicText]}>
              {transactionData?.address.zipcode}{" "}
              {transactionData?.address.homeNumber}{" "}
              {transactionData?.address.streetName}{" "}
              {transactionData?.address.townName}{" "}
              {transactionData?.address.stateName} {""}
              {transactionData?.address.countryName} {""}
            </Text>
          </View>
        </View>
        {transactionData?.deliveryStatus === "completed" && (
          <View
            style={[
              styles.basicView,
              {
                gap: 5,
                padding: 10,
                backgroundColor: "#08ac2f",
                marginTop: 20,
                borderRadius: 5,
              },
            ]}
          >
            <AntDesign name="infocirlceo" size={14} color="#fff" />
            <Text style={[styles.basicText, { color: "#fff" }]}>
              please not that delivery in handed by outside compnay and will
              determine your delivery time
            </Text>
          </View>
        )}
        <Pressable
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 3,
            marginTop: 20,
          }}
          onPress={() =>
            Alert.alert("This is coming soon! ", " Not avaliable yet")
          }
        >
          <Text style={[styles.basicText, { color: "white" }]}>
            Downlaod Transaction
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TransartId;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    marginBlock: 50,
    marginBottom: 100,
    borderWidth: 1,
    paddingBlock: 40,
    padding: 15,
    borderRadius: 5,
    borderColor: "#08aa00",
    backgroundColor: Colors.white,
    alignItems: "center",

    elevation: 5,
    shadowColor: "blue",
  },
  basicText: {
    fontFamily: "outfit",
    fontSize: 13,
    textTransform: "capitalize",
    color: "black",
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
  foodItem: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 5,
    padding: 10,
    paddingInline: 20,
    margin: 10,
    height: 170,
    backgroundColor: "#08ac2f",
    elevation: 4,
    alignItems: "center",
    marginTop: 40,
  },
});
