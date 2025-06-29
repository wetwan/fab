import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import HotDeals from "@/components/home/hotDeals";
import Welcome from "@/components/home/welcome";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* profile icon and name  */}
        <Welcome />

        {/* catergoires  */}
        <Categories />
        {/* bannner  */}
        <Banner />
        {/* hot deals  */}
        <HotDeals />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
