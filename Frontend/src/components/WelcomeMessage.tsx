import { useMsal } from "@azure/msal-react";

export default function WelcomeMessage() {
    const { accounts,instance } = useMsal();
    const user = accounts[0];

  const handleLogout = () => {
    instance.logoutPopup();
  };
  
    return (
      <div>
        {user ? (
          <div>
            <p>ようこそ、{user.name}さん！</p>
            <p>Microsoft Entra IDを使用してログインしました。</p>
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        ) : (
          <p>ログインしてください。</p>
        )}
      </div>
    );
  }