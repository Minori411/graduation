import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { SignInButton } from "./components/Login";
import { SignOutButton } from "./components/Logout";
import { Employee } from "./components/Employee";
import TodoAppBar from './components/TodoAppBar';
import Home from './components/Home';
import TodoList from './components/TodoList'; 
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig"; 

function App() {
  const { instance } = useMsal();

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [instance]);
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <AuthenticatedTemplate>
                <SignOutButton />
                <Employee />
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <SignInButton />
                <h4 className="title is-4">Please sign in to view employee info.</h4>
              </UnauthenticatedTemplate>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoAppBar />
        <Routes>        
          <Route path="/login" element={<SignInButton />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<TodoList />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;