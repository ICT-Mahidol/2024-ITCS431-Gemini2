import Cookies from "js-cookie";
import { Role } from "./enums";

// Keep the interface for payload structure
interface JWTPayload {
  username: string;
  role: string;
  // Add other expected fields if necessary (e.g., sub, exp, iat)
}

export class CookieHelper {
  // Renamed for clarity, as it's a helper for cookies
  private readonly cookieName: string;

  constructor(cookieName: string) {
    if (!cookieName) {
      throw new Error("Cookie name must be provided.");
    }
    this.cookieName = cookieName;
  }

  /**
   * Retrieves the raw cookie value.
   * Returns null if the cookie doesn't exist.
   */
  get token(): string | null {
    return Cookies.get(this.cookieName) ?? null;
  }

  /** * Decodes the JWT payload from the cookie.  * Returns the parsed payload object or null if the cookie doesn't exist, * is not a valid JWT, or cannot be parsed.
   */
  get payload(): JWTPayload | null {
    const token = this.token;
    if (!token) {
      console.log(`Cookie "${this.cookieName}" not found.`);
      return null;
    }

    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) {
        console.error(`Invalid JWT structure for cookie "${this.cookieName}".`);
        return null;
      }
      // Replace characters for proper Base64 decoding and decode
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const parsedPayload = JSON.parse(jsonPayload);

      // Optional: Basic validation to check if essential fields exist
      if (
        typeof parsedPayload.username !== "string" ||
        typeof parsedPayload.role !== "string"
      ) {
        console.warn(
          `Payload for cookie "${this.cookieName}" missing expected fields.`
        );
        // Decide if you want to return partial data or null
        // return parsedPayload as Partial<JWTPayload> || null; // If partial is okay
        return null; // If required fields missing, treat as invalid
      }

      return parsedPayload as JWTPayload;
    } catch (error) {
      console.error(
        `Error decoding/parsing JWT from cookie "${this.cookieName}":`,
        error
      );
      return null;
    }
  }

  /**
   * Gets the username from the JWT payload.
   * Returns the username string or null if not available or invalid.
   */
  get userName(): string | null {
    const currentPayload = this.payload; // Get fresh payload
    return currentPayload?.username ?? null; // Use optional chaining and nullish coalescing
  }

  /**
   * Gets the user role from the JWT payload.
   * Returns the role string or null if not available or invalid.
   */
  get role(): Role | null {
    const currentPayload = this.payload; // Get fresh payload
    if (!currentPayload) {
      return null; // If payload is invalid, return null
    }
    if (currentPayload.role === Role.ASTRONOMER) {
      return Role.ASTRONOMER;
    } else {
      return Role.SCIENCE_OBSERVER;
    }
  }

  /**
   * Checks if the user token exists and is potentially valid (decodable).
   */
  get exists(): boolean {
    return this.payload !== null;
  }

  /**
   * Clears the cookie.
   */
  clear(): void {
    Cookies.remove(this.cookieName);
  }

  setCookie(jwtToken: string): void {
    Cookies.set(this.cookieName, jwtToken);
  }
}

// Example Usage:
// const authCookie = new CookieHelper('your_jwt_cookie_name');
//
// if (authCookie.exists) {
//   const username = authCookie.userName;
//   const role = authCookie.userRole;
//   console.log(`Welcome ${username}, your role is ${role}`);
//
//   // Example: Conditionally render UI based on role
//   if (role === 'admin') {
//     // show admin panel
//   }
// } else {
//   console.log('User is not logged in.');
// }
//
// // To log out:
// // authCookie.clear();
