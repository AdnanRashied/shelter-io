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
import { loginUser, AuthenticationError } from "helper/loginUser";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginUser({ email, password });
      console.log("Token:", token);
      router.replace("/");
    } catch (error) {
      if (error instanceof AuthenticationError) {
        Alert.alert("Login Failed", error.message);
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
                disabled={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
