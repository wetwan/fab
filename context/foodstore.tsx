/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/configs/FireBase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type FoodContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  category: any[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
  getCategory: () => Promise<void>;
  slider: any[];
  setSlider: React.Dispatch<React.SetStateAction<any[]>>;
  getSlider: () => Promise<void>;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState<any[]>([]);
  const [categoryFood, setCategoryFood] = useState<any[]>([]);
  const [slider, setSlider] = useState<any[]>([]);

  const getCategory = async () => {
    setCategory([]);
    setIsLoading(true);
    const q = query(collection(db, "category"), orderBy("id"));
    const quarySnapshot = await getDocs(q);

    quarySnapshot.forEach((doc) => {
      setCategory((prev) => [...prev, { $id: doc.id, ...doc.data() }]);
      console.log(doc.data());
    });
    setIsLoading(false);
  };
  const getSlider = async () => {
    setSlider([]);
    setIsLoading(true);
    const q = query(collection(db, "slider"));
    const quarySnapshot = await getDocs(q);

    quarySnapshot.forEach((doc) => {
      setSlider((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setIsLoading(false);
  };

  // const getCategoryFood = async () => {
  //   setIsLoading(true);
  //   setCategoryFood([]);

  //   try {
  //     const q = query(collection(db, "food"), where("category", "==", category));
  //     const querySnapshot = await getDocs(q);

  //     const foods = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setCategoryFood(foods);
  //   } catch (error) {
  //     console.error("Failed to fetch category food:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getCategory();
    getSlider();
    // getCategoryFood();
  }, []);
  return (
    <FoodContext.Provider
      value={{
        getCategory,
        isLoading,
        setIsLoading,
        category,
        setCategory,
        getSlider,
        slider,
        setSlider,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodCreation() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error("useListCreation must be used within a AppContextProvider");
  }
  return context;
}
