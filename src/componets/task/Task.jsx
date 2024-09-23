import {  DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import React from 'react'

const Task = ({task,taskList,setTaskList,index}) => {
  const handDelete = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };
  return (
    <Draggable index={index} draggableId={task.draggableId}>
      {(provided) => (
            <div className='taskBox' key={task.id} ref={provided.innerRef} 
            {...provided.draggableProps} {...provided.dragHandleProps}> 
            <p className='taskText'>
              {task.text}
            </p>
            <button className='taskTrashButton' onClick={() => handDelete(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
      )}
    </Draggable>
  );
};


export default Task
