import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "7c78d20e-ddc7-4a38-bbc2-2db066510c73", // Azure Portalから取得したアプリケーションID
    redirectUri: "https://localhost:44449", // ログイン後にリダイレクトするURL
    authority: "https://login.microsoftonline.com/34e13d85-3d97-43dd-9521-81f6ed0fdb5d" // テナントIDを指定
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);