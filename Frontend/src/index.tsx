import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import SignUppage from './components/SignUp'
import { Suspense } from 'react';
import TodoList from './components/TodoList';
import PasswordReset from './components/PasswordReset'
import { RecoilRoot } from 'recoil';
import TodoAppBar from './components/TodoAppBar';
import ReactDOM from "react-dom";

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/signup" element={<SignUppage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RecoilRoot><div className="App"><TodoAppBar /><TodoList /></div></RecoilRoot>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.render(<App />, rootElement);

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [data, setData] = useState('');

//     useEffect(() => {
//         axios.get('/api/mydata') // バックエンドのAPIエンドポイントを指定
//             .then((response) => {
//                 setData(response.data.message);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     return (
//         <div>
//             <p>Data from the backend: {data}</p>
//         </div>
//     );
// }

// export default App;