import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import { Suspense } from 'react';
import TodoList from './components/TodoList';
import { RecoilRoot } from 'recoil';
import createRoot from "react-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import TodoAppBar from './components/TodoAppBar'; // TodoAppBarをインポート
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./config/msalConfig";

const theme = createTheme();

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoAppBar />
          <Routes>        
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RecoilRoot><div className="App"><TodoList /></div></RecoilRoot>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
    </MsalProvider>
  );
}



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [data, setData] = useState('');

//     useEffect(() => {
//         // C#のAPIエンドポイントにGETリクエストを送信
//         axios.get('https://localhost:7256/api/data')
//             .then((response) => {
//                 setData(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     return (
//         <div>
//             <p>Data from C#: {data}</p>
//         </div>
//     );
// }

// export default App;

const rootElement = document.getElementById("root")!;
createRoot.render(<App />, rootElement);