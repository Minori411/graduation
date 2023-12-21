import { useMsal } from "@azure/msal-react";
import { loginApiRequest } from "../config/authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    const state = { page_id: 1, user_id: 5 };
    const title = '';
    const url = '/';
    window.history.pushState(state, title, url);
    instance.loginRedirect(loginApiRequest).catch((e) => {
      
      console.error("Login error:", e);
    });
  };

  return <button onClick={handleLogin}>Sign In</button>;
};