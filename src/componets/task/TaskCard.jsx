import React, { useState } from "react";
import TaskCardTitle from "./TaskTitle";
import TaskCardDeleteButton from "../Button/TaskCardDeleteButton";
import TaskAddInput from "./input/TaskAddInput";
import Tasks from "./Taskes";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ taskCard, taskCardsList, setTaskCardsList, index }) => {
  const [inputText, setInputText] = useState("");
  const [taskList, setTaskList] = useState(taskCard.tasks || []);

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
            <TaskCardTitle taskId={taskCard.id} initialTitle={taskCard.title} />
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
            cardId={taskCard.id}
          />
          <Tasks
            taskList={taskList}
            setTaskList={setTaskList}
            cardId={taskCard.id}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
