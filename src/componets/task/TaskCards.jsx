import React, { useState, useEffect, useContext } from "react";
import AddTaskCardButton from "../Button/AddTaskCardButton";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTaskCards = async () => {
      if (!user?._id) return;

      try {
        // カードの取得
        const cardsResponse = await axios.get(`/api/posts/cards/${user._id}`);
        const cards = cardsResponse.data;

        // 各カードに属するタスクを取得
        const cardsWithTasks = await Promise.all(
          cards.map(async (card) => {
            const tasksResponse = await axios.get(
              `/api/posts/tasks/${card._id}`
            );
            return {
              id: card._id,
              draggableId: `card-${card._id}`,
              title: card.title || "新しいカード",
              tasks: tasksResponse.data.map((task) => ({
                id: task._id,
                draggableId: `task-${task._id}`,
                text: task.desc,
                userId: task.userId,
              })),
            };
          })
        );

        setTaskCardsList(cardsWithTasks);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
      }
    };

    fetchTaskCards();
  }, [user]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const remove = taskCardsList.splice(result.source.index, 1);
    taskCardsList.splice(result.destination.index, 0, remove[0]);
    setTaskCardsList([...taskCardsList]);
  };

  return (
    <div className="taskCarsArea">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className="taskCardsArea"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {taskCardsList.map((taskCard, index) => (
                <TaskCard
                  key={taskCard.id}
                  index={index}
                  taskCard={taskCard}
                  taskCardsList={taskCardsList}
                  setTaskCardsList={setTaskCardsList}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddTaskCardButton
        taskCardsList={taskCardsList}
        setTaskCardsList={setTaskCardsList}
      />
    </div>
  );
};

export default TaskCards;
