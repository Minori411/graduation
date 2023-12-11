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

const msalInstance = new PublicClientApplication(msalConfig);
const theme = createTheme();

axios.defaults.baseURL = "https://localhost:7256/api/";
axios.interceptors.request.use(
  async (response) => {
    const account = msalInstance.getAllAccounts()[0];
    const msalResponse = await msalInstance.acquireTokenSilent({
      ...loginApiRequest,
      account: account,
    });
    response.headers.common.Authorization = `Bearer ${msalResponse.accessToken}`;
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

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