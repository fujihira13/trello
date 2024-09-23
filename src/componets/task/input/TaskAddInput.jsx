import React from "react";
import { v4 as uuidv4 } from "uuid";

const TaskAddInput = ({ inputText, setInputText, setTaskList, taskList }) => {
  const handleSubmit = (e) => {
    const taskId = uuidv4();
    e.preventDefault();
    if (inputText === "") {
      return;
    }
    //カードを追加する
    setTaskList([
      ...taskList,
      {
        id: taskId,
        text: inputText,
        draggableId: `task-${taskId}`,
      },
    ]);
    setInputText("");
  };
  const handleChnage = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="追加してください"
          className="taskAddInput"
          onChange={handleChnage}
          value={inputText}
        ></input>
      </form>
    </div>
  );
};

export default TaskAddInput;
