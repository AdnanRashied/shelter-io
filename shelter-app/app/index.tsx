import { Button } from "@react-navigation/elements";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { clearSession } from "../helper/clearSession";
import useAuthGuard from "../hooks/useAuthGuard";

export default function HomeScreen() {
  const router = useRouter();
  const loading = useAuthGuard();

  const handleLogout = async () => {
    await clearSession();
    router.replace("/auth/LoginScreen");
  };

  const pushVoiceScreen = () => {
    router.push("/voice/VoiceScreen");
  };

  if (loading) {
    return <Text>Checking authentication...</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Welcome Home</Text>
      <Button onPress={handleLogout}> Logout </Button>
      <Button onPress={pushVoiceScreen}> Voice Screen </Button>
      <Text className="text-3xl">Welcome Home</Text>
    </View>
  );
}
