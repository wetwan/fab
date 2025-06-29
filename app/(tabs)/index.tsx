import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import HotDeals from "@/components/home/hotDeals";
import Welcome from "@/components/home/welcome";
import React from "react";
import { SafeAreaView } from "react-native";

const Index = () => {
  return (
    <SafeAreaView>
      {/* profile icon and name  */}
      <Welcome />
      {/* catergoires  */}
      <Categories />
      {/* bannner  */}
      <Banner />
      {/* hot deals  */}
      <HotDeals />
    </SafeAreaView>
  );
};

export default Index;
