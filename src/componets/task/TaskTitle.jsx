import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const TaskTitle = ({ taskId, initialTitle = "today" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { user } = useContext(AuthContext);

  const startEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const saveTitle = async () => {
    if (!taskId || taskId === "default-card") {
      console.log("有効なタスクIDがありません");
      return;
    }

    try {
      if (!user?._id) {
        throw new Error("ログインが必要です");
      }

      // 空のタイトルは保存しない
      if (!title.trim()) {
        setTitle(initialTitle);
        return;
      }

      console.log("タイトル更新リクエスト:", {
        taskId,
        userId: user._id,
        title: title,
      });

      await axios.put(`/api/posts/${taskId}`, {
        userId: user._id,
        title: title,
      });
    } catch (err) {
      console.error("タイトル更新エラー:", err);
      setTitle(initialTitle);
      alert("タイトルの更新に失敗しました");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveTitle();
    setIsEditing(false);
  };

  const handleBlur = async () => {
    await saveTitle();
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="taskCardTitleInputArea">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="taskCardInput"
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={10}
          />
        </form>
      ) : (
        <h3 onClick={startEditing}>{title}</h3>
      )}
    </div>
  );
};

export default TaskTitle;
