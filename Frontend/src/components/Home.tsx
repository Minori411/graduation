// import React, { useState, useEffect } from 'react';
// import { Task } from '../atoms/Tasks';

// function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState({ content: '', detail: '', deadline:"",isCompleted: false,tags: "" });

//   // タスク一覧を取得する関数
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('/api/content');
//       if (!response.ok) {
//         throw new Error('タスクの取得に失敗しました');
//       }
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ページが読み込まれたときにタスク一覧を取得
//   useEffect(() => {
//     fetchTasks();
//   }, []);

// //   // 新しいタスクを作成する関数
// //   const createTask = async () => {
// //     try {
// //       const response = await fetch('/api/content', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(newTask),
// //       });
// //       if (!response.ok) {
// //         throw new Error('タスクの作成に失敗しました');
// //       }
// //       const data = await response.json();
// //       setTasks((prevTasks) => [...prevTasks, data]); // 新しいタスクを追加
// //       setNewTask({ title: '', description: '', isCompleted: false }); // フォームをクリア
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   // タスクを更新する関数
// //   const updateTask = async (task) => {
// //     try {
// //       const response = await fetch(`/api/content/${task.pk}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(task),
// //       });
// //       if (!response.ok) {
// //         throw new Error('タスクの更新に失敗しました');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

//   // タスクを削除する関数
//   const deleteTask = async (taskId) => {
//     try {
//       const response = await fetch(`/api/content/${taskId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('タスクの削除に失敗しました');
//       }
//       setTasks(tasks.filter((task) => task.id !== taskId)); // タスクを削除
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {/* タスク一覧表示 */}
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.content}
//             <button onClick={() => deleteTask(task.id)}>削除</button>
//           </li>
//         ))}
//       </ul>

//       {/* 新しいタスク作成フォーム
//       <input
//         type="text"
//         placeholder="タイトル"
//         value={newTask.title}
//         onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//       />
//       <button onClick={createTask}>追加</button> */}
//     </div>
//   );
// }

// export default Home;

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/tasks'; // バックエンドAPIのURL

// タスク一覧を取得する関数
export const getTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('タスクの取得に失敗しました', error);
    throw error;
  }
};

// タスクを作成する関数
export const createTask = async (task) => {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (error) {
    console.error('タスクの作成に失敗しました', error);
    throw error;
  }
};

// タスクを更新する関数
export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('タスクの更新に失敗しました', error);
    throw error;
  }
};

// タスクを削除する関数
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('タスクの削除に失敗しました', error);
    throw error;
  }
};