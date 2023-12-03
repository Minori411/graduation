import { useMsal } from "@azure/msal-react";

export default function UserProfile() {
  const { instance, accounts } = useMsal();
  const user = accounts.length > 0 ? accounts[0] : null;

  const handleLogin = () => {
    instance.loginPopup({ scopes: ["user.read"] })
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      {user ? <div>ログイン済み: {user.name}</div> : <div>ログインしてください</div>}
    </div>
  );
}