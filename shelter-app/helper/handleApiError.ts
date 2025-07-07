import { ApiError, AuthenticationError } from "./error";

async function handleApiError(
  response: Response,
  isAuthEndpoint = false
): Promise<void> {
  if (response.ok) return;

  let errorMessage = "Request failed";

  try {
    const errorData = await response.json();
    if (errorData && typeof errorData.message === "string") {
      errorMessage = errorData.message;
    }
  } catch (err) {
    console.warn("Failed to parse error response:", err);
  }

  if (isAuthEndpoint) {
    throw new AuthenticationError(errorMessage, response.status);
  } else {
    throw new ApiError(errorMessage, response.status);
  }
}

export default handleApiError;
