import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../../state/AuthContext";
import axios from "axios";

const TaskAddInput = ({
  inputText,
  setInputText,
  setTaskList,
  taskList,
  cardId,
}) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText === "") {
      return;
    }

    try {
      if (!user?._id) {
        throw new Error("ログインが必要です");
      }

      // バックエンドAPIに投稿を送信
      const response = await axios.post("/api/posts", {
        userId: user._id,
        desc: inputText,
        parentCardId: cardId, // カードIDを含める
        isCard: false,
      });

      if (response.data) {
        // 投稿が成功したら、フロントエンドの状態を更新
        setTaskList([
          ...taskList,
          {
            id: response.data._id,
            text: inputText,
            draggableId: `task-${response.data._id}`,
            userId: user._id,
          },
        ]);

        setInputText("");
      }
    } catch (err) {
      console.error("投稿エラー:", err);
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
          placeholder="タスクを追加して"
          className="taskAddInput"
          onChange={handleChange}
          value={inputText}
        />
      </form>
    </div>
  );
};

export default TaskAddInput;
