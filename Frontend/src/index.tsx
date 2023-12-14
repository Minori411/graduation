import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import { msalConfig, loginApiRequest } from "./config/authConfig";
import 'bulma/css/bulma.min.css';
import App from './App'; // App コンポーネントをインポート
import reportWebVitals from './reportWebVitals'; 
import { RecoilRoot } from 'recoil';
import { getToken } from "./config/authConfig"


export const msalInstance = new PublicClientApplication(msalConfig);
const theme = createTheme();

axios.defaults.baseURL = "https://localhost:7256/api/";
axios.interceptors.request.use(async (config) => {
  // トークンを取得
  const token = await getToken();

  // configオブジェクトが存在し、headersプロパティが定義されていることを確認
  if (config && config.headers) {
    // Authorizationヘッダーを設定
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // リクエストエラーのハンドリング
  return Promise.reject(error);
});



const rootElement = document.getElementById('root');
if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Router>
              <App /> 
            </Router>
          </RecoilRoot>
        </ThemeProvider>
      </MsalProvider>
    </React.StrictMode>
  );
} else {
  console.error('ルート要素が見つかりません。');
}

reportWebVitals(console.log);