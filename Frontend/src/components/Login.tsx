import { useMsal } from "@azure/msal-react";
import { loginApiRequest } from "../config/authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginApiRequest).catch((e) => {
      
      console.error("Login error:", e);
    });
  };

  return <button onClick={handleLogin}>Sign In</button>;
};