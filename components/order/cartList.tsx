/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { CartItem } from "@/types/type";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface cartlistProp {
  cart: CartItem;
}

const CartList = ({ cart }: cartlistProp) => {
  const [carts, setCart] = useState({});

  const toatlPrice = cart.quantity * cart.price;

  const removeCart = async (id: string) => {
    try {
      const cartRef = doc(db, "carts", cart.$id); // Replace with actual userId

      await updateDoc(cartRef, {
        // Remove the item or set its quantity to 0, or handle as needed
        quantity: 0,
        lastUpdated: new Date(), // Optional timestamp
      });

      setCart({ ...cart, quantity: 0 }); // Update local state
    } catch (error) {
      console.log(error, "error removing cart");
    }
  };

  const updateCart = async (itemId: keyof CartItem, quantity: number) => {
    try {
      const cartRef = doc(db, "carts", cart.$id);
      if (quantity > 0) {
        await setDoc(cartRef, { ...cart, [itemId]: quantity }, { merge: true });
        setCart((prevCart) => ({ ...prevCart, [itemId]: quantity }));
      } else {
        const { [itemId]: item, ...rest } = cart;
        await setDoc(cartRef, rest);
        setCart(rest);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  //   const handleIncrement = async (item: CartItem) => {
  //     const quantity = (cart[item.id] || 0) + 1;
  //     updateCart(item.id, quantity);
  //   };

  //   const handleDecrement = async (item:CartItem) => {
  //     const quantity = Math.max((cart[item.id] || 0) - 1, 0);
  //     updateCart(item.id, quantity);
  //   };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 50,
        marginBlock: 10,
        borderWidth: 1,
        borderColor: "#228B22",
        borderRadius: 5,
      }}
    >
      <Image source={{ uri: cart.imageUrl }} height={50} width={50} />

      <Text style={[styles.text]}>{cart.name}</Text>
      <Text style={[styles.text]}>{cart.price}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Pressable style={[styles.button]} onPress={() => {}}>
          <Text style={[styles.text, { color: Colors.white, fontSize: 16 }]}>
            -
          </Text>
        </Pressable>
        <Pressable style={[styles.button]}>
          <Text style={[styles.text, { color: Colors.white }]}>
            {cart.quantity}
          </Text>
        </Pressable>
        <Pressable style={[styles.button]} onPress={() => {}}>
          <Text style={[styles.text, { color: Colors.white, fontSize: 16 }]}>
            +
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.text]}>{toatlPrice}</Text>
      <Pressable
        onPress={() => removeCart(cart.id)}
        style={{ padding: 5, backgroundColor: "red", borderRadius: 3 }}
      >
        <Text style={[styles.text, { color: Colors.white }]}>remove</Text>
      </Pressable>
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#228B22",
    height: 30,
    width: 30,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  text: {
    fontFamily: "outfit",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
