import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Sign In",
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.box}>
              <Text style={styles.title}>Login</Text>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#00000",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  box: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
