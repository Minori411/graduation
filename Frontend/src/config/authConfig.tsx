import { LogLevel } from "@azure/msal-browser";
import { msalInstance } from "../index";



// MSALの設定
export const msalConfig = {
  auth: {
    clientId: "7c78d20e-ddc7-4a38-bbc2-2db066510c73", // クライアントID
    authority: 'https://login.microsoftonline.com/34e13d85-3d97-43dd-9521-81f6ed0fdb5d', // テナントID
    redirectUri: "https://localhost:44449/",
  },
  cache: {
    cacheLocation: "sessionStorage", // キャッシュの保存場所
    storeAuthStateInCookie: false, // IE11やEdgeで問題がある場合は"true"に設定
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};


// APIリクエストのスコープ
export const loginApiRequest = {
  scopes: ["api://7c78d20e-ddc7-4a38-bbc2-2db066510c73/api.scope"],
  redirectUri: "https://localhost:44449/"
};


export async function getToken() {
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw Error("アカウントが見つかりません。ログインが必要です。");
    }
    const response = await msalInstance.acquireTokenSilent({
      ...loginApiRequest,
      account: account,
    });
    return response.accessToken;
  } catch (error) {
    const errorMessage = "トークン取得エラー";
    console.error(errorMessage); // エラーメッセージをコンソールに出力
  }
}

export default getToken;