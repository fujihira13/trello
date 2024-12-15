import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import React, { useContext } from "react"; // useContextを追加
import { AuthContext } from "../../../state/AuthContext";
const TaskAddInput = ({ inputText, setInputText, setTaskList, taskList }) => {
  // AuthContextから現在のユーザー情報を取得
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {
      return;
    }

    const taskId = uuidv4();

    try {
      // ユーザーがログインしているか確認
      if (!user || !user._id) {
        throw new Error("ログインが必要です");
      }

      // バックエンドAPIに投稿を送信
      const response = await axios.post("/api/posts", {
        userId: user._id, // AuthContextから取得したユーザーIDを使用
        desc: inputText,
      });

      if (response.data) {
        // 投稿が成功したら、フロントエンドの状態を更新
        setTaskList([
          ...taskList,
          {
            id: taskId,
            text: inputText,
            draggableId: `task-${taskId}`,
            postId: response.data._id,
          },
        ]);

        setInputText("");
      }
    } catch (err) {
      console.error("投稿エラー:", err);
      // より詳細なエラーメッセージを表示
      if (err.response) {
        alert(
          `投稿に失敗しました: ${
            err.response.data.message || err.response.statusText
          }`
        );
      } else if (err.message) {
        alert(err.message);
      } else {
        alert("投稿に失敗しました。再度お試しください。");
      }
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タスクを追加してください"
          className="taskAddInput"
          onChange={handleChange}
          value={inputText}
        />
      </form>
    </div>
  );
};

export default TaskAddInput;
