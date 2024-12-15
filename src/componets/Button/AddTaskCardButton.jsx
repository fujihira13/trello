import { Draggable } from "@hello-pangea/dnd";
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const AddTaskCardButton = ({ taskCardsList, setTaskCardsList }) => {
  const { user } = useContext(AuthContext);

  const addTaskCard = async () => {
    const taskCardId = uuid();

    try {
      if (!user?._id) {
        throw new Error("ログインが必要です");
      }

      // 新しいタスクカードをバックエンドに保存
      const response = await axios.post("/api/posts", {
        userId: user._id,
        title: "新しいカード", // デフォルトのタイトル
        desc: "", // 空の説明
        isCard: true, // これはカードであることを示すフラグ
      });

      // フロントエンドの状態を更新
      setTaskCardsList([
        ...taskCardsList,
        {
          id: response.data._id, // バックエンドから返されたID
          draggableId: `item${taskCardId}`,
          title: "新しいカード",
          tasks: [],
        },
      ]);
    } catch (err) {
      console.error("カード追加エラー:", err);
      alert("カードの追加に失敗しました");
    }
  };

  return (
    <div className="addTaskCardButtonArea">
      <button className="addTaskCardButton" onClick={addTaskCard}>
        +
      </button>
    </div>
  );
};

export default AddTaskCardButton;
