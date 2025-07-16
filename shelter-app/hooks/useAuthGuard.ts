import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function useAuthGuard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = await SecureStore.getItemAsync("user-token");
      if (!token) {
        router.replace("/auth/LoginScreen");
      } else {
        setChecking(false);
      }
    };

    verifyAuth();
  }, []);

  return checking;
}
