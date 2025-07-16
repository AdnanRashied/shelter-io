import * as SecureStore from "expo-secure-store";
import { AuthenticationError } from "../error";
import handleApiError from "../handleApiError";
import { LOGIN_GATEWAY } from "@env";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    [key: string]: any;
  };
}

const GATEWAY_URL = `${LOGIN_GATEWAY}/login`;

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<string> => {
  const response = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  await handleApiError(response, true);

  const data: LoginResponse = await response.json();

  if (!data.token) {
    throw new AuthenticationError(
      "No token returned by gateway.",
      response.status
    );
  }

  await SecureStore.setItemAsync("user-token", data.token);

  return data.token;
};
