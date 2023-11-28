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