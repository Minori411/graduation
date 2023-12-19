import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Linkをインポート
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { SignInButton } from "./components/Login";
import { SignOutButton } from "./components/Logout";
import { Employee } from "./components/Employee";
import Home from './components/Home';
import TodoList from './components/TodoList'; 
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { instance } = useMsal();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Login', 'Logout', 'Register'].map((text, index) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [instance]);

  return (
    <div>
    {/* //   <section className="section">
    //     <div className="container">
    //       <div className="columns is-centered">
    //         <div className="column is-half">
    //           <AuthenticatedTemplate>
    //             <SignOutButton />
    //             <Employee />
    //           </AuthenticatedTemplate>
    //           <UnauthenticatedTemplate>
    //             <SignInButton />
    //             <h4 className="title is-4">Please sign in to view employee info.</h4>
    //           </UnauthenticatedTemplate>
    //         </div>
    //       </div>
    //     </div>
    //   </section> */}

      <Suspense fallback={<div>Loading...</div>}>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
        <Routes>        
          <Route path="/login" element={<SignInButton />} />
          <Route path="/logout" element={<SignOutButton />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<TodoList />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;