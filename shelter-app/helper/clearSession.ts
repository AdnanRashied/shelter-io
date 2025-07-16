import * as SecureStore from "expo-secure-store";

export const SECURE_STORAGE_KEYS = {
  USER_TOKEN: "user-token",
};

export const clearSession = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_KEYS.USER_TOKEN);
    console.log("Session cleared.");
  } catch (err) {
    console.error("Failed to clear session:", err);
  }
};
