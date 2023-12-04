import React from 'react';
import { useMsal } from "@azure/msal-react";
import { Container, Box, Button, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  const { instance, accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;

  const handleLogin = () => {
    instance.loginPopup({ scopes: ["user.read"] })
      .then(response => {
        console.log(response.accessToken);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px', textAlign: 'center' }}>
        <Box my={2}>
          {user ? (
            <div>
              <Typography variant="h5" gutterBottom>
                ようこそ、{user.name}さん！
              </Typography>
              <Typography variant="body1">
                Microsoft Entra IDを使用してログインしました。
              </Typography>
              <button onClick={handleLogout}>ログアウト</button>
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={handleLogin}>
              ログイン
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}