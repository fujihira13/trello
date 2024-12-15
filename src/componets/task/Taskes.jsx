import React from "react";
import Task from "./Task";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const Taskes = ({ taskList, setTaskList }) => {
  const handleDragEnd = (result) => {
    // ドロップ先が無い場合は何もしない
    if (!result.destination) {
      return;
    }

    // 配列の複製を作成
    const newTaskList = Array.from(taskList);

    // 移動元のアイテムを削除
    const [removed] = newTaskList.splice(result.source.index, 1);

    // 移動先に挿入
    newTaskList.splice(result.destination.index, 0, removed);

    // 状態を更新
    setTaskList(newTaskList);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <div key={task.id}>
                  <Task
                    index={index}
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Taskes;
