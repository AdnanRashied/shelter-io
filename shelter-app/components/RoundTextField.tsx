import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";

interface RoundTextFieldProps extends TextInputProps {
  label?: string;
}

export default function RoundTextField({
  label,
  ...props
}: RoundTextFieldProps) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholderTextColor="#aaa" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    color: "white",
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#000034",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    fontSize: 16,
  },
});
