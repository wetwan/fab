/* eslint-disable react-hooks/exhaustive-deps */
import Addcard from "@/components/order/addcart";
import AddLocation from "@/components/order/addLocation";
import CartList from "@/components/order/cartList";
import TotalPayment from "@/components/order/totalpayment";
import Welcome from "@/components/order/welcome";
import { useFoodCreation } from "@/context/foodstore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Order = () => {
  const {
    cart,
    isLoading,
    totalPriceOfCart,
    taxPriceOfCart,
    getCart,
    payment,
    setPayment,
  } = useFoodCreation();

  const [cards, setCards] = useState<boolean>(false);

  const [cartData, setCartData] = useState<any[]>([]);


  useEffect(() => {
  
  }, [cartData]);

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
    <View style={{ flex: 1 }}>
      {/* header  section */}
      <Welcome />

      {/* cart display  */}
      <FlatList
        data={cart}
        renderItem={({ item: cart }) => <CartList cart={cart} />}
        keyExtractor={(item, i) => item.id.toString() || i.toString()}
        refreshing={isLoading}
        onRefresh={getCart}
          ListEmptyComponent={() => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 250,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        textAlign: "center",
                        textTransform: "capitalize",
                        color: "gray",
                      }}
                    >
                      No item found in cart
                    </Text>
                  </View>
                )}
      />

      {/* total amount and payment  */}

      <TotalPayment
        totalPriceOfCart={totalPriceOfCart}
        taxPriceOfCart={taxPriceOfCart}
        payment={setPayment}
        cartData={cartData}
        setCartData={setCartData}
      />

      {payment && (
        <AddLocation
          payment={setPayment}
          setCard={setCards}
          cartData={cartData}
          setCartData={setCartData}
          totalPriceOfCart={totalPriceOfCart}
          taxPriceOfCart={taxPriceOfCart}
        />
      )}
      {cards && (
        <Addcard
          payment={setPayment}
          setCards={setCards}
          cartData={cartData}
          setCartData={setCartData}
        />
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
