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
  return (
    <Draggable draggableId={taskCard.id} index={index}>
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
            <TaskTitle />
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
