/* eslint-disable react-hooks/exhaustive-deps */
import { Colors } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface LoginInputProps extends TextInputProps {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  label?: string;
}

const LoginInput = ({
  inputStyle,
  containerStyle,
  label,
  value,
  onFocus,
  onBlur,
  secureTextEntry,
  ...prop
}: LoginInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || internalValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, internalValue]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    prop.onChangeText && prop.onChangeText(text);
  };

  const labelStyle = {
    position: "absolute" as const,
    left: 0,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [40, 10],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [13, 18],
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#659CF6"],
    }),
    paddingHorizontal: 2,
    zIndex: 1,
  };

  return (
    <View style={[{ paddingTop: 18, marginTop: 10 }, containerStyle]}>
      {label && (
        <Animated.Text
          style={[
            labelStyle,
            { textTransform: "capitalize", fontFamily: "outfit" },
          ]}
        >
          {label}
        </Animated.Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: isFocused ? Colors.blue : "#aaa",
        }}
      >
        <TextInput
          style={[
            { flex: 1 },
            inputStyle,
            {
              outline: Platform.OS === "web" ? "none" : undefined,
              paddingTop: label ? 20 : 10,
              fontFamily: "outfit-medium",
              color: isFocused ? "#000" : "#aaa",
            },
          ]}
          value={value !== undefined ? value : internalValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          {...prop}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ marginLeft: 8, padding: 4 }}
          >
            <Text style={{ color: "#659CF6", fontSize: 16 }}>
              {showPassword ? (
                <Feather name="eye-off" size={20} color={Colors.red} />
              ) : (
                <Feather name="eye" size={20} color={Colors.blue} />
              )}
            </Text>
            {/* Replace with an eye icon if you use a vector icon library */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginInput;
