import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

interface review {
  foodData: FoodItem;
}

const Reviews = ({ foodData }: review) => {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    if (!foodData?.id) return;
    try {
      const docRef = doc(db, "food", foodData.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().reviews || [];
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const AddReview = async () => {
    if (!foodData?.id) {
      Alert.alert("Food item ID is missing.");
      return;
    }
    setLoading(true);
    try {
      const docRef = doc(db, "food", foodData.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          message: message,
          userName: user?.fullName,
          userImage: user?.imageUrl,
          time: new Date().toISOString(),
        }),
      });

      Alert.alert("Review added successfully.");
      setMessage("");
      setLoading(false);
      // Refetch updated reviews after adding a new one
      await fetchReviews();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={{ fontFamily: "outfit-bold", marginBlock: 10 }}>
        Reviews
      </Text>
      <View>
        <TextInput
          placeholder="Write your comment here"
          numberOfLines={4}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.gray,
            textAlignVertical: "top",
          }}
          value={message}
          onChangeText={(t) => setMessage(t)}
        />
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.red,
            borderRadius: 5,
            marginTop: 5,
          }}
          activeOpacity={0.8}
          disabled={!message || loading}
          onPress={AddReview}
        >
          <Text
            style={{
              fontFamily: "outfit",
              textAlign: "center",
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Fetches the latest reviews for the given food item

export default Reviews;
