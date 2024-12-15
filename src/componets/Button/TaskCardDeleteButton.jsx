import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const TaskCardDeleteButton = ({
  taskCardsList,
  setTaskCardsList,
  taskCard,
}) => {
  const { user } = useContext(AuthContext);

  const taskCardDeleteButton = async (id) => {
    try {
      if (!user?._id) {
        throw new Error("ログインが必要です");
      }

      // 削除前の確認
      if (!window.confirm("このカードを削除してもよろしいですか？")) {
        return;
      }

      // バックエンドAPIでカードを削除
      await axios.delete(`/api/posts/${id}`, {
        data: { userId: user._id },
      });

      // フロントエンドの状態を更新
      setTaskCardsList(taskCardsList.filter((card) => card.id !== id));
    } catch (err) {
      console.error("カード削除エラー:", err);
      if (err.response?.status === 403) {
        alert("他のユーザーのカードは削除できません");
      } else {
        alert("カードの削除に失敗しました: " + err.message);
      }
    }
  };

  return (
    <div>
      <button
        className="deleteButton"
        onClick={() => taskCardDeleteButton(taskCard.id)}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default TaskCardDeleteButton;
