import * as React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonVariant = "block" | "white";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button = ({
  title,
  onPress,
  variant = "block",
  style,
  textStyle,
  disabled,
}: ButtonProps) => {
  const isBlock = variant === "block";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, isBlock ? styles.block : styles.white, style]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          isBlock ? styles.textBlock : styles.textWhite,
          textStyle,
          { fontFamily: "outfit" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  block: {
    backgroundColor: "#659CF6",
    fontFamily: "outfit",
  },
  white: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#659CF6",
    fontFamily: "outfit",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "outfit",
    textTransform: "capitalize",
  },
  textBlock: {
    color: "#fff",
    fontFamily: "outfit",
  },
  textWhite: {
    color: "#659CF6",
    fontFamily: "outfit",
  },
});

export default Button;
