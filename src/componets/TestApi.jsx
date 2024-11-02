import React, { useState, useEffect } from "react";
import axios from "axios";

const TestData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // MongoDBに実際に登録されているユーザーのIDを指定
        const userId = "66f766a223bd0d37863d5edb  ";

        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}`
        );
        console.log("取得したデータ:", response.data); // レスポンスの確認用
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error("エラーの詳細:", err); // エラーの詳細を確認
        setError("データの取得に失敗しました: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ローディング中の表示
  if (loading) {
    return <div>データを読み込み中...</div>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>エラーが発生しました</h3>
        <p>{error}</p>
      </div>
    );
  }

  // データの表示
  return (
    <div style={{ padding: "20px" }}>
      <h2>ユーザー情報</h2>
      {user && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            maxWidth: "500px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestData;
