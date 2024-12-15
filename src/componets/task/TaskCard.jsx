import React, { useState } from "react";
import TaskTitle from "./TaskTitle";
import TaskCardDeleteButton from "../Button/TaskCardDeleteButton";
import TaskAddInput from "./input/TaskAddInput";
import Taskes from "./Taskes";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({
  taskCardsList,
  setTaskCardsList,
  taskCard,
  index,
  tasks = [],
}) => {
  const [inputText, setInputText] = useState("");
  const [taskList, setTaskList] = useState(tasks);

  const effectiveTaskId =
    taskCard.id === "default-card" && tasks.length > 0
      ? tasks[0].postId
      : taskCard.id;

  return (
    <Draggable draggableId={taskCard.draggableId} index={index}>
      {(provided) => (
        <div
          className="taskCard"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="taskTitlleAndTaskDelete"
            {...provided.dragHandleProps}
          >
            <TaskTitle
              taskId={effectiveTaskId}
              initialTitle={taskCard.title || "today"}
            />
            <TaskCardDeleteButton
              taskCardsList={taskCardsList}
              setTaskCardsList={setTaskCardsList}
              taskCard={taskCard}
            />
          </div>
          <TaskAddInput
            inputText={inputText}
            setInputText={setInputText}
            taskList={taskList}
            setTaskList={setTaskList}
          />
          <Taskes
            inputText={inputText}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
