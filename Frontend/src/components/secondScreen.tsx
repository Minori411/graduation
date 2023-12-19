import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SecondScreen() {
    const [data, setData] = useState<{ id: number; name: string }[]>([]);

  // バックエンドからデータをフェッチする関数
  const fetchDataFromBackend = async () => {
    try {
      // バックエンドのエンドポイントを適切に設定する
      const response = await axios.get('https://localhost:7256/api/content');
      setData(response.data); // フェッチしたデータをセット
    } catch (error) {
      console.error('データのフェッチ中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    // 画面がマウントされたときにデータをバックエンドからフェッチ
    fetchDataFromBackend();
  }, []);

  return (
    <div>
      <h1>セカンドスクリーン</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}