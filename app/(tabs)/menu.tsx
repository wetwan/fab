import Food from "@/components/menu/food";
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Menu = () => {
  const [allFoods, setAllFoods] = useState<any[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "food"));
        const foods = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllFoods(foods);
        setFilteredFoods(foods);
      } catch (error) {
        console.log(error, " error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleSearch = (text: string) => {
    setValue(text);
    const searchText = text.toLowerCase();

    const filtered = allFoods.filter((food) =>
      food.name?.toLowerCase().includes(searchText)
    );

    setFilteredFoods(filtered);
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </SafeAreaView>
    );
  }
  return (
    <View style={{}}>
      {/* search box */}
      <View
        style={{
          paddingRight: 5,
          backgroundColor: Colors.red,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          height: 150,
          paddingBlock: 50,
          position: "fixed",
          top: 0,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignContent: "center",
            backgroundColor: Colors.white,
            marginHorizontal: "10%",
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            name="search"
            size={24}
            color={Colors.gray}
            style={{ padding: 10 }}
          />
          <TextInput
            placeholder="Search......"
            style={{ fontFamily: "outfit", fontSize: 16, padding: 10 }}
            onChangeText={handleSearch}
            value={value}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={filteredFoods}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: "2%" }}
          renderItem={({ item: food }) => <Food food={food} />}
          keyExtractor={(item) => item.id.toString()}
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
                no {value} found
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
