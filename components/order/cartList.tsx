import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import { CartItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface cartlistProp {
  cart: CartItem;
}

const CartList = ({ cart }: cartlistProp) => {
  // const [carts, setCart] = useState<any[]>([]);
  const { getCart, removeFromCart } = useFoodCreation();
  const { user } = useUser();

  const userId = user?.id;

  const toatlPrice = (cart?.quantity ?? 0) * (cart?.price ?? 0);

  const updateCart = async (itemId: string, quantity: number) => {
    if (!userId) return;

    try {
      const cartRef = doc(db, "carts", userId as string);
      const docSnap = await getDoc(cartRef);

      let updatedCart: CartItem[] = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          updatedCart = [...data.items];
        }
      }

      const existingIndex = updatedCart.findIndex((item) => item.id === itemId);

      if (quantity > 0) {
        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity = quantity;
        } else {
          updatedCart.push({
            id: itemId,
            quantity,
            addedAt: new Date().toISOString(),
          });
        }
      } else {
        updatedCart = updatedCart.filter((item) => item.id !== itemId);
      }
      await setDoc(cartRef, { items: updatedCart }, { merge: true });
      await getCart();
    } catch (error) {
      console.error("Cart update error:", error);
    }
  };

  const handleIncrement = () => {
    const quantity = (cart?.quantity || 0) + 1;
    if (cart.id) {
      updateCart(cart.id, quantity);
    }
  };

  const handleDecrement = () => {
    const quantity = Math.max((cart?.quantity || 0) - 1, 0);
    if (cart.id) {
      updateCart(cart.id, quantity);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 15,
        marginBlock: 10,
        borderWidth: 1,
        borderColor: "#228B22",
        borderRadius: 5,
        marginTop: 20,
      }}
    >
      <Image
        source={{ uri: cart.imageUrl }}
        height={50}
        width={50}
        style={{ borderRadius: 5 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={[styles.text]}>{cart.name}</Text>
        <Text
          style={[
            styles.text,
            {
              textAlign: "center",
              color: "white",
              backgroundColor: "green",
              paddingHorizontal: 3,
            },
          ]}
        >
          {cart.price}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Pressable
          style={[styles.button]}
          onPress={() => {
            handleDecrement();
          }}
        >
          <Text style={[styles.text, { color: Colors.white, fontSize: 16 }]}>
            -
          </Text>
        </Pressable>
        <Pressable style={[styles.button]}>
          <Text style={[styles.text, { color: Colors.white }]}>
            {cart.quantity}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={() => {
            handleIncrement();
          }}
        >
          <Text style={[styles.text, { color: Colors.white, fontSize: 16 }]}>
            +
          </Text>
        </Pressable>
      </View>
      <Text
        style={[
          styles.text,
          { color: "white", backgroundColor: "pink", paddingHorizontal: 4 },
        ]}
      >
        {toatlPrice}
      </Text>
      <Pressable
        onPress={() => {
          removeFromCart(cart.id);
        }}
        style={{ padding: 5, backgroundColor: "red", borderRadius: 3 }}
      >
        <Text style={[styles.text, { color: Colors.white }]}>x</Text>
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
