import React, { useState, useEffect, useContext } from "react";
import TaskCard from "./TaskCard";
import AddTaskCardButton from "../Button/AddTaskCardButton";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id) return;

      try {
        const response = await axios.get(`/api/posts/profile/${user._id}`);

        // 取得した投稿をタスクカード形式に変換
        const tasks = response.data.map((post) => ({
          id: post._id,
          draggableId: `task-${post._id}`,
          text: post.desc,
          userId: post.userId,
          title: post.title || "today",
          postId: post._id,
        }));

        // 最初のタスクカードにタスクを設定
        setTaskCardsList([
          {
            id: tasks.length > 0 ? tasks[0].postId : "default-card",
            draggableId: "default-card",
            tasks: tasks,
            title: tasks.length > 0 ? tasks[0].title : "today",
          },
        ]);
      } catch (err) {
        console.error("投稿の取得に失敗しました:", err);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const remove = taskCardsList.splice(result.source.index, 1);
    taskCardsList.splice(result.destination.index, 0, remove[0]);
    setTaskCardsList([...taskCardsList]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="taskCarsArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskCardsList.map((taskCard, index) => (
              <TaskCard
                key={taskCard.id}
                index={index}
                taskCardsList={taskCardsList}
                setTaskCardsList={setTaskCardsList}
                taskCard={taskCard}
                tasks={taskCard.tasks}
              />
            ))}
            {provided.placeholder}
            <AddTaskCardButton
              taskCardsList={taskCardsList}
              setTaskCardsList={setTaskCardsList}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskCards;
