import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

interface review {
  foodData: FoodItem;
}

const Reviews = ({ foodData }: review) => {
  const { user } = useUser();
  const [message, setMessage] = useState("");

  const AddReview = async () => {
    try {
      const docRef = doc(db, "food", foodData?.id);
      await updateDoc(docRef, {
        reviews: arrayUnion({
          message: message,
          userName: user?.fullName,
          userImage: user?.imageUrl,
        }),
      });
      Alert.alert("Review added successfully.");
    } catch (error) {
      Alert.alert(JSON.stringify(error));
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
          disabled={!message}
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

export default Reviews;
