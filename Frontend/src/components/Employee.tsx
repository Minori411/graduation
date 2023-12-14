import axios from "axios";
import { useState } from "react";
import getToken from "../config/authConfig";


export const Employee = () => {
  const [employees, setEmployees] = useState<string[]>([]);

  const getEmployees = () => {
    getToken().then(accessToken => {
      axios.get("Employees/employees/", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        // エラーハンドリング
        handleApiError(error);
      });
    });
  };

  const getTotalEmployees = () => {
    getToken().then(accessToken => {
      axios.get("Employees/total-employees", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        alert(`The total employees: ${response.data}`);
      })
      .catch((error) => {
        // エラーハンドリング
        handleApiError(error);
      });
    });
  };

  const handleApiError = (error) => {
    if (error.response) {
      // HTTPエラーの処理
      if (error.response.status === 403) {
        alert("Your access is not allowed.");
      } else if (error.response.status === 401) {
        alert("Unauthorized");
      }
      // 他のステータスコードの処理もここに追加
    } else if (error.request) {
      // リクエストはされたがレスポンスがない場合
      alert("No response from the server.");
    } else {
      // リクエスト設定時のエラー
      console.log("Error: " + error.message);
    }
  };

  return (
    <div>
      <button className="button is-success" onClick={getEmployees}>
        Get Employees
      </button>
      <button className="button" onClick={getTotalEmployees}>
        Get Total Employees
      </button>
      <ol>
        {employees.map((employee, index) => (
          <li key={index}>{employee}</li>
        ))}
      </ol>
    </div>
  );
};