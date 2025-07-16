import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import RoundButton from "components/RoundButton";
import RoundTextField from "components/RoundTextField";
import logo from "../../assets/images/vectorhome.png";
import { loginUser } from "./loginUser";
import { AuthenticationError } from "../../helper/error";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginUser({ email, password });
      router.replace("/");
    } catch (error) {
      if (error instanceof AuthenticationError) {
        Alert.alert("Login Failed");
      } else {
        Alert.alert(
          "Unexpected Error",
          "Something went wrong. Please try again."
        );
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "android" ? 10 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.box}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.title}>Shelter.io</Text>

              <RoundTextField
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <RoundTextField
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <RoundButton
                title={loading ? "Logging In..." : "Log In"}
                onPress={handleLogin}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  box: {
    backgroundColor: "rgba(103, 58, 183, 0.1)",
    borderRadius: 20,
    padding: 24,
    borderColor: "rgba(103, 58, 183, 0.3)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 1,
  },
});

export default LoginScreen;
