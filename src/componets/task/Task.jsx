import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const Task = ({ task, taskList, setTaskList, index }) => {
  const { user } = useContext(AuthContext);

  const handDelete = async (taskId) => {
    try {
      if (!user?._id) {
        throw new Error("ログインが必要です");
      }

      // 削除前の確認
      if (!window.confirm("このタスクを削除してもよろしいですか？")) {
        return;
      }

      // postIdが存在する場合はそれを使用し、なければtaskIdを使用
      const deleteId = task.postId || taskId;

      console.log("削除するID:", deleteId); // デバッグ用

      // バックエンドAPIで投稿を削除
      await axios.delete(`/api/posts/${deleteId}`, {
        data: { userId: user._id },
      });

      // フロントエンドの状態を更新
      setTaskList(taskList.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("削除エラー:", err);
      console.log("タスク情報:", task); // デバッグ用
      if (err.response?.status === 403) {
        alert("他のユーザーの投稿は削除できません");
      } else {
        alert("タスクの削除に失敗しました: " + err.message);
      }
    }
  };

  return (
    <Draggable index={index} draggableId={task.draggableId}>
      {(provided) => (
        <div
          className="taskBox"
          key={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="taskText">{task.text}</p>
          <button
            className="taskTrashButton"
            onClick={() => handDelete(task.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
