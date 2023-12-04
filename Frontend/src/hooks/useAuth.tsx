import React, { useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

function MyComponent() {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance.acquireTokenSilent({
        scopes: ["user.read"],
        account: accounts[0]
      }).then(response => {
        // トークンを使用してAPIリクエストを行う
        alert(response.accessToken);
        fetch("https://localhost:7256", {
          headers: {
            Authorization: `Bearer ${response.accessToken}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      }).catch(error => {
        // トークン取得エラーのハンドリング
        console.error(error);
      });
    }
  }, [instance, accounts]); // 依存配列にinstanceとaccountsを追加

  return <div>コンテンツ</div>;
}

export default MyComponent;