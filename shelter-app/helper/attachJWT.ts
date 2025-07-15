import * as SecureStore from "expo-secure-store";

export const authorizedFetch = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = await SecureStore.getItemAsync("user-token");

  const authHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers: authHeaders,
  });
};
