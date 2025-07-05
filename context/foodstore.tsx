/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/FireBase";
import { CartItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface PaymentSheetParams {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  paymentIntentId: string;
}

type FoodContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  category: any[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
  getCategory: () => Promise<void>;
  slider: any[];
  setSlider: React.Dispatch<React.SetStateAction<any[]>>;
  getSlider: () => Promise<void>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getCart: () => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  openPaymentSheet: () => Promise<void>;
  address: {
    zipcode: string;
    homeNumber: string;
    streetName: string;
    townName: string;
    stateName: string;
    countryName: string;
  };
  setAddress: React.Dispatch<
    React.SetStateAction<{
      zipcode: string;
      homeNumber: string;
      streetName: string;
      townName: string;
      stateName: string;
      countryName: string;
    }>
  >;
  phone: string;
  setphone: React.Dispatch<React.SetStateAction<string>>;
  handleContact: () => Promise<void>;
  sheetInitialized: boolean;
  setSheetInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  totalPriceOfCart: number;
  taxPriceOfCart: number;
  payment: boolean;
  setPayment: React.Dispatch<React.SetStateAction<boolean>>;
};

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const userId = user?.id;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState<any[]>([]);
  const [slider, setSlider] = useState<any[]>([]);
  const [payment, setPayment] = useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");

  const totalPriceOfCart = cart.reduce(
    (acc, item) => acc + (item?.quantity ?? 0) * (item.price ?? 0),
    0
  );
  const taxPriceOfCart = (4 / 100) * totalPriceOfCart;

  const total = (totalPriceOfCart + taxPriceOfCart) * 100;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [sheetInitialized, setSheetInitialized] = useState(false); // To track if sheet is ready to be opened

  const API_URL = "https://sripeback.onrender.com";
  const [address, setAddress] = useState({
    zipcode: "",
    homeNumber: "",
    streetName: "",
    townName: "",
    stateName: "",
    countryName: "",
  });

  const [phone, setphone] = useState("");

  const getCategory = async () => {
    setCategory([]);
    setIsLoading(true);
    const q = query(collection(db, "category"));
    const quarySnapshot = await getDocs(q);

    quarySnapshot.forEach((doc) => {
      setCategory((prev) => [...prev, { $id: doc.id, ...doc.data() }]);
    });
    setIsLoading(false);
  };

  const getCart = async () => {
    if (!userId) {
      setCart([]);
      setIsLoading(false);
      return;
    }
    try {
      setCart([]);
      setIsLoading(true);

      const cartDocRef = doc(db, "carts", userId as string);

      const docSnap = await getDoc(cartDocRef);

      const allItems: CartItem[] = [];

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          allItems.push(...data.items);
        } else {
          console.warn(
            "Cart document found, but 'items' field is not an array or is missing."
          );
        }
      } else {
        console.log("No cart found for this user.");

        setCart([]);

        return; // Exit early if no cart document
      }
      setCart(allItems);
    } catch (error) {
      console.error("Error getting cart:", error); // Use console.error for better visibility
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!userId) return;

    try {
      // 2. Get current cart from Firestore
      const cartRef = doc(db, "carts", userId);
      const docSnap = await getDoc(cartRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const currentItems: CartItem[] = Array.isArray(data.items)
          ? data.items
          : [];

        // 3. Filter out the removed item
        const updatedItems = currentItems.filter((item) => item.id !== itemId);

        // 4. Update Firestore
        await setDoc(cartRef, { items: updatedItems }, { merge: true });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
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

  const fetchPaymentSheetParams = async (): Promise<PaymentSheetParams> => {
    try {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Backend error fetching payment sheet params:",
          errorData
        );
        throw new Error(
          errorData.message || "Failed to fetch payment details from backend."
        );
      }

      const { paymentIntent, ephemeralKey, customer, paymentIntentId } =
        await response.json();
      return { paymentIntent, ephemeralKey, customer, paymentIntentId };
    } catch (error: any) {
      console.error("Network or backend error:", error);
      Alert.alert(
        "Error",
        `Could not connect to payment server. ${error.message}`
      );
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    setIsLoading(true);
    setSheetInitialized(false);

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Fab.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
          name: user?.fullName || "", // Use currentUser

          email: user?.primaryEmailAddress?.emailAddress,
          phone: phone,
          address: {
            line1: address.homeNumber + address.streetName,
            city: address.homeNumber,
            state: address.stateName,

            country: address.countryName,
          },
        },
        allowsDelayedPaymentMethods: true,
      });
      setPaymentIntentId(paymentIntentId);
      if (error) {
        console.error("Error initializing payment sheet:", error);
        Alert.alert("Payment Setup Error", error.message);
      } else {
        setSheetInitialized(true);
      }
    } catch (error) {
      console.error("Caught error during payment sheet initialization:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    if (!sheetInitialized) {
      Alert.alert(
        "Payment Not Ready",
        "Please wait while payment setup completes."
      );
      console.warn("Attempted to open payment sheet before initialization.");
      return;
    }

    const cartSnapshot: CartItem[] = [...cart];
    const currentTotalAmount: number = total;

    if (cartSnapshot.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Your cart is empty. Please add items before proceeding to checkout."
      );
      return;
    }
    if (!userId) {
      Alert.alert("Error", "User not logged in. Cannot process order.");
      return;
    }

    setIsLoading(true);

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Payment Failed: ${error.code}`, error.message);
      console.error(
        `Payment presentation error code: ${error.code}`,
        error.message
      );

      try {
        await setDoc(
          doc(db, "transactions"),
          {
            userId: userId,
            orderTime: serverTimestamp(),
            orderDate: Date.now(),
            totalAmount: currentTotalAmount,
            status: "failed",
            paymentIntentId: error.code,
            items: cartSnapshot,
            errorMessage: error.message,
            errorCode: error.code,
          },
          { merge: true }
        );
        console.log("Failed transaction logged.");
      } catch (logError) {
        console.error("Error logging failed transaction:", logError);
      }
    } else {
      Alert.alert("Success", "Your order is confirmed!");
      try {
        const transactionRef = doc(collection(db, "transactions"));

        await setDoc(transactionRef, {
          userId,
          orderTime: serverTimestamp(),
          totalAmount: currentTotalAmount,
          status: "completed",
          paymentIntentId,
          phone,
          address,
          items: cartSnapshot,
          orderDate: Date.now(),
        });
        console.log(
          "Transaction saved to Firestore with ID:",
          transactionRef.id
        );

        const userCartRef = doc(db, "carts", userId);
        await deleteDoc(userCartRef);

        setCart([]);
        setPayment(false);
        router.replace("/(tabs)/menu");
      } catch (saveError) {
        console.error("Error saving transaction or clearing cart:", saveError);
        Alert.alert(
          "Order Processing Error",
          "Your payment was successful, but there was an issue saving your order or clearing your cart. Please contact support."
        );
      }
      setSheetInitialized(false);
    }
    setIsLoading(false);
  };

  const handleContact = async () => {
    if (
      !address.countryName ||
      !address.homeNumber ||
      !address.stateName ||
      !address.streetName ||
      !address.townName ||
      !phone
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all contact and address details."
      );
      return;
    }

    if (!sheetInitialized) {
      Alert.alert(
        "Payment Not Ready",
        "Please wait while payment setup completes or try again."
      );
      console.warn(
        "Attempted to open payment sheet via handleContact before initialization."
      );
      return;
    }

    setIsLoading(true);

    try {
      await openPaymentSheet();
    } catch (error) {
      console.error("Error in handleContact or opening payment sheet:", error);
      Alert.alert(
        "Submission Error",
        "Failed to process your request. Please try again."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (total > 0) {
      initializePaymentSheet();
    }
  }, [total]);

  useEffect(() => {
    getCategory();
    getSlider();
  }, []);

  useEffect(() => {
    getCart();
  }, [userId]);

  return (
    <FoodContext.Provider
      value={{
        payment,
        setPayment,
        totalPriceOfCart,
        taxPriceOfCart,
        getCategory,
        getCart,
        cart,
        setCart,
        isLoading,
        setIsLoading,
        category,
        setCategory,
        getSlider,
        slider,
        removeFromCart,
        setSlider,
        openPaymentSheet,
        address,
        setAddress,
        phone,
        setphone,
        handleContact,
        setSheetInitialized,
        sheetInitialized,
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
