import { db } from "@/configs/FireBase";
import { CartItem, FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FoodPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { food: foodId } = useLocalSearchParams();
  const userId = user?.id;

  const [foodData, setFoodData] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const getFoodData = async () => {
      if (!foodId) {
        Alert.alert("Error", "No food item specified.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const docRef = doc(db, "food", foodId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const item: FoodItem = {
            id: docSnap.id,
            name: data.name,
            category: data.category,
            image: data.image,
            price: data.price,
            like: data.like || [],
            description: data.description || "No description available.",
          };
          setFoodData(item);
          if (userId && item.like.includes(userId)) {
            setHasLiked(true);
          }
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

    getFoodData();
  }, [foodId, userId]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };

  const handleLike = async () => {
    if (!foodData || !userId) {
      Alert.alert("Error", "You must be logged in to like an item.");
      return;
    }

    setIsProcessing(true);
    const likeRef = doc(db, "food", foodData.id);

    try {
      if (hasLiked) {
        setHasLiked(false);
        setFoodData((prev) => ({
          ...prev!,
          like: prev!.like.filter((id) => id !== userId),
        }));
        await updateDoc(likeRef, { like: arrayRemove(userId) });
      } else {
        setHasLiked(true);
        setFoodData((prev) => ({ ...prev!, like: [...prev!.like, userId] }));
        await updateDoc(likeRef, { like: arrayUnion(userId) });
      }
    } catch (error) {
      console.error("Like update error:", error);
      setHasLiked((prev) => !prev);
      Alert.alert("Error", "Failed to update like status.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToCart = async () => {
    if (!foodData || !userId) {
      Alert.alert("Error", "Cannot add to cart. User or food data is missing.");
      return;
    }

    setIsProcessing(true);
    const cartRef = doc(db, "carts", userId);

    try {
      await runTransaction(db, async (transaction) => {
        const cartDoc = await transaction.get(cartRef);
        let newCartItems = [];

        const newItem = {
          id: foodData.id,
          name: foodData.name,
          price: foodData.price,
          imageUrl: foodData.image,
          quantity: count,
        };

        if (!cartDoc.exists()) {
          newCartItems = [newItem];
        } else {
          const existingItems = cartDoc.data().items || [];
          const itemIndex: number = existingItems.findIndex(
            (item: CartItem) => item.id === foodData.id
          );

          if (itemIndex > -1) {
            existingItems[itemIndex].quantity += count;
            newCartItems = existingItems;
          } else {
            newCartItems = [...existingItems, newItem];
          }
        }
        transaction.set(
          cartRef,
          { items: newCartItems, lastUpdated: serverTimestamp() },
          { merge: true }
        );
      });

      Alert.alert(
        "Success!",
        `${count}x ${foodData.name}  added to your cart. Price is ${
          count * foodData.price
        } `
      );
    } catch (e) {
      console.error("Add to cart transaction failed: ", e);
      Alert.alert("Error", "Something went wrong while adding to cart.");
    } finally {
      setIsProcessing(false);
    }
  };

  const buttons = [
    {
      title: "Add to Cart",
      icon: <MaterialCommunityIcons name="cart-plus" size={24} color="white" />,
      bg: "#f39c12",
      action: handleAddToCart,
    },
    {
      title: "Buy Now",
      icon: <Ionicons name="wallet" size={24} color="white" />,
      bg: "#2ecc71",
      action: () =>
        Alert.alert(
          "Coming Soon!",
          "The 'Buy Now' feature is not yet implemented."
        ),
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </SafeAreaView>
    );
  }

  if (!foodData) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Could not load food item.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back-circle" size={35} color="white" />
            </Pressable>
            <Pressable onPress={handleLike} disabled={isProcessing}>
              {hasLiked ? (
                <AntDesign name="heart" size={35} color="#e74c3c" />
              ) : (
                <AntDesign name="hearto" size={35} color="white" />
              )}
            </Pressable>
          </View>

          <Image source={{ uri: foodData.image }} style={styles.foodImage} />

          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.foodName}>{foodData.name}</Text>
              <View style={styles.categoryContainer}>
                <Entypo name="bowl" size={18} color="#e74c3c" />
                <Text style={styles.categoryTag}>{foodData.category}</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <FontAwesome6 name="naira-sign" size={18} />
              <Text
                style={{ fontSize: 22, marginLeft: 2, fontFamily: "outfit" }}
              >
                {typeof foodData.price === "number" ? foodData.price.toFixed(2) : "0.00"}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#e74c3c",
                  marginLeft: 8,
                  fontFamily: "outfit",
                }}
              >
                per kg
              </Text>
            </View>

            <Text style={styles.description}>{foodData.description}</Text>

            <View style={styles.likesCartRow}>
              <Text>
                <AntDesign name="heart" size={14} color="#e74c3c" />
                {foodData.like.length} likes
              </Text>
              <View style={styles.cartControl}>
                <Pressable
                  style={styles.circleButton}
                  onPress={handleDecrement}
                >
                  <Text style={styles.circleText}>-</Text>
                </Pressable>
                <Text
                  style={{
                    color: "#e74c3c",
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "outfit",
                  }}
                >
                  {count}
                </Text>
                <Pressable
                  style={styles.circleButton}
                  onPress={handleIncrement}
                >
                  <Text style={styles.circleText}>+</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.actionButtonsContainer}>
              {buttons.map((button) => (
                <TouchableOpacity
                  key={button.title}
                  disabled={isProcessing}
                  onPress={button.action}
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: button.bg,
                      opacity: isProcessing ? 0.6 : 1,
                    },
                  ]}
                >
                  {button.icon}
                  <Text style={styles.actionBtnText}>
                    {isProcessing && button.title === "Add to Cart"
                      ? "Processing..."
                      : button.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerIcons: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  foodImage: { width: "100%", height: 350, resizeMode: "cover" },
  detailsContainer: {
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    padding: 30,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "outfit",
  },
  foodName: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    flex: 1,
    textTransform: "capitalize",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fdecec",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontFamily: "outfit",
  },
  categoryTag: {
    color: "#e74c3c",
    fontWeight: "600",
    textTransform: "capitalize",
    fontFamily: "outfit",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    fontFamily: "outfit",
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginTop: 20,
    fontFamily: "outfit",
  },
  likesCartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingVertical: 10,
    fontFamily: "outfit",
  },
  cartControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    fontFamily: "outfit",
  },
  circleButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "outfit",
  },
  circleText: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "outfit",
  },
  actionButtonsContainer: { marginTop: 20, flexDirection: "row", gap: 15 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
  },
  actionBtnText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});

export default FoodPage;
