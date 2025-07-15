import * as SecureStore from "expo-secure-store";

export const clearSession = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("user-token");
  } catch (err) {
    console.error("Failed to clear session:", err);
  }
};
