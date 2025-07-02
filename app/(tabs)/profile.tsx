import { Colors } from "@/constants/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel", onPress: () => {} },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.push("/(auth)");
          } catch (err) {
            console.error(JSON.stringify(err, null, 2));
          }
        },
      },
    ]);
    return;
  };

  const profileItem = [
    {
      name: "order history",
      icons: <MaterialIcons name="history" size={24} color={Colors.red} />,
      path: "/(transact)/transart",
    },
    {
      name: "liked food",
      icons: <AntDesign name="hearto" size={24} color={Colors.red} />,
      path: "/(likes)/myLikes",
    },
    {
      name: "cart",
      icons: <AntDesign name="shoppingcart" size={24} color={Colors.red} />,
      path: "/(tabs)/order",
    },
    {
      name: "contact us",
      icons: (
        <MaterialIcons name="contact-support" size={24} color={Colors.red} />
      ),
      path: "/(tabs)",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.headercontainner]}>
        <Image
          style={styles.image}
          // source={require("../../assets/images/profile3-500x500.png")}
          source={{ uri: user?.imageUrl }}
        />
        <Text style={[styles.basicText]}>{user?.fullName}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        {profileItem.map((item, i) => (
          <Pressable
            onPress={() => router.push(item.path as any)}
            key={i}
            style={[
              styles.basicView,
              {
                padding: 15,
                gap: 20,
                backgroundColor: "white",
                margin: 15,
                marginHorizontal: 30,
                elevation: 2,
                borderRadius: 5,
              },
            ]}
          >
            {item.icons}
            <Text
              style={[
                styles.basicText,
                { color: "black", fontFamily: "outfit-medium" },
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[
          styles.basicView,
          {
            padding: 15,
            gap: 20,
            backgroundColor: Colors.red,
            // paddingInline: 300,
            elevation: 2,
            borderRadius: 5,
            justifyContent: "center",
            position: "absolute",
            bottom: 10,
            width: "70%",
            left: "15%",
            transform: [{ translateX: 10 }, { translateY: -50 }],
          },
        ]}
        onPress={handleSignOut}
      >
        <Text
          style={[
            styles.basicText,
            {
              color: "white",
              textAlign: "center",
              fontFamily: "outfit-medium",
            },
          ]}
        >
          log out
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    objectFit: "cover",
    borderRadius: 40,
  },
  headercontainner: {
    paddingBlock: 100,
    height: 300,
    top: 0,
    position: "fixed",
    zIndex: 100,
    backgroundColor: Colors.red,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    // justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  basicText: {
    fontFamily: "outfit-bold",
    color: Colors.white,
    textTransform: "capitalize",
    fontSize: 20,
  },
  basicView: { flexDirection: "row", alignItems: "center" },
});
