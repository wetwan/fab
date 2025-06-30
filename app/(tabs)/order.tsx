import CartList from "@/components/order/cartList";
import TotalPayment from "@/components/order/totalpayment";
import Welcome from "@/components/order/welcome";
import { db } from "@/configs/FireBase";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CartItem {
  $id: string;
  id: string;
  name: string;
  userId: string;
  quantity: number;
  imageUrl: string;
  price: number;
  addedAt?: string;
}

const Order = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCart = async () => {
    try {
      setCart([]);
      setIsLoading(true);

      const q = query(collection(db, "carts"));
      const querySnapshot = await getDocs(q);

      const allItems: CartItem[] = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          allItems.push(...data.items);
        }
      });

      setCart(allItems);
    } catch (error) {
      console.log(error, "error getting cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </SafeAreaView>
    );
  }

  if (!cart) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Could not load food item.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{flex: 1}}>
      {/* header  section */}
      <Welcome />

      {/* cart display  */}
      <FlatList
        data={cart}
        renderItem={({ item: cart }) => <CartList cart={cart} />}
      />

      {/* total amount and payment  */}

      <TotalPayment cart={cart} />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
