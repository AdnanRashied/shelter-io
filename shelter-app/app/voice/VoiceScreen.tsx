import React from "react";
import { View, Text } from "react-native";
import useAuthGuard from "hooks/useAuthGuard";

const VoiceScreen: React.FC = () => {
  const checking = useAuthGuard();

  if (checking) {
    return (
      <View>
        <Text> Returning to LoginScreen </Text>
      </View>
    );
  }

  const handleVoice = async () => {};

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text> Voice Screen </Text>
    </View>
  );
};

export default VoiceScreen;
