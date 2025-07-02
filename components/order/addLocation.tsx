/* eslint-disable react-hooks/exhaustive-deps */
import { useFoodCreation } from "@/context/foodstore";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddLocation = ({ payment, cartData, setCartData }: any) => {
  const { user } = useUser();

  const {
    address,
    setAddress,
    isLoading,
    handleContact,
    phone,
    setphone,
    sheetInitialized,
  } = useFoodCreation();

  useEffect(() => {
    setCartData({ ...cartData, address });
  }, [address]);

  return (
    <View style={[styles.container]}>
      <Pressable
        style={{
          position: "absolute",
          top: 1,
          right: 1,
          borderWidth: 2,
          height: 30,
          width: 30,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "red",
          borderRadius: 20,
        }}
        onPress={() => payment(false)}
      >
        <Text
          style={[
            styles.basicText,
            {
              textAlign: "center",
              color: "red",
              fontFamily: "outfit-bold",
              fontSize: 16,
            },
          ]}
        >
          x
        </Text>
      </Pressable>
      <Image
        source={require("../../assets/images/logo.png")}
        height={30}
        width={30}
        style={styles.logo}
      />
      <View
        style={{
          gap: 5,
          flex: 1,
          marginBottom: 10,
        }}
      >
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", textAlign: "center" },
          ]}
        >
          {user?.fullName}
        </Text>
        <Text
          style={[
            styles.basicText,
            { textTransform: "capitalize", textAlign: "center" },
          ]}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.basicText,
            {
              fontFamily: "outfit-bold",
              textTransform: "capitalize",
              fontSize: 18,
            },
          ]}
        >
          contact info
        </Text>
        <TextInput
          style={[styles.input, {}]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(t) => setphone(t)}
          placeholderTextColor={"#08aa00"}
        />
        <View
          style={[
            styles.basicView,
            { width: 300, justifyContent: "space-between", gap: 10 },
          ]}
        >
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="Zip code"
            keyboardType="default"
            value={address.zipcode}
            onChangeText={(text) => setAddress({ ...address, zipcode: text })}
            placeholderTextColor={"#08aa00"}
          />
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="House Number"
            keyboardType="default"
            value={address.homeNumber}
            onChangeText={(text) =>
              setAddress({ ...address, homeNumber: text })
            }
            placeholderTextColor={"#08aa00"}
          />
        </View>

        <TextInput
          style={[styles.input, {}]}
          placeholder="Street Name"
          keyboardType="default"
          value={address.streetName}
          onChangeText={(text) => setAddress({ ...address, streetName: text })}
          placeholderTextColor={"#08aa00"}
        />
        <TextInput
          style={[styles.input, {}]}
          placeholder="Town Name"
          keyboardType="default"
          value={address.townName}
          onChangeText={(text) => setAddress({ ...address, townName: text })}
          placeholderTextColor={"#08aa00"}
        />
        <View
          style={[
            styles.basicView,
            { width: 300, justifyContent: "space-between", gap: 10 },
          ]}
        >
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="State"
            keyboardType="default"
            value={address.stateName}
            onChangeText={(text) => setAddress({ ...address, stateName: text })}
            placeholderTextColor={"#08aa00"}
          />
          <TextInput
            style={[styles.input, { flex: 1, flexShrink: 1 }]}
            placeholder="Country"
            keyboardType="default"
            value={address.countryName}
            onChangeText={(text) =>
              setAddress({ ...address, countryName: text })
            }
            placeholderTextColor={"#08aa00"}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#08aa00",
          marginTop: 10,
          padding: 20,
          borderRadius: 4,
        }}
        disabled={isLoading || !sheetInitialized}
        onPress={handleContact}
      >
        <Text
          style={[
            styles.basicText,
            {
              textTransform: "capitalize",
              textAlign: "center",
              color: "white",
            },
          ]}
        >
          submit contact
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  basicView: { flexDirection: "row", alignItems: "center" },
  container: {
    position: "absolute",
    top: "30%",
    left: "40%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    zIndex: 200,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    width: 50,
    height: 50,
  },

  basicText: {
    fontFamily: "outfit",
    fontSize: 14,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderColor: "#08aa00",
    backgroundColor: "white",
    color: "#08aa00",
    fontFamily: "outfit",
    fontSize: 14,
    borderRadius: 3,
    marginTop: 10,
  },
});
