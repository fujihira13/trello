import React from 'react'
import Task from './Task'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

const Taskes = ({taskList,setTaskList}) => {
  const handleDragEnd = (result) => {
    //タスク並び替え
    const remove = taskList.splice(result.source.index,1)
    taskList.splice(result.destination.index,0,remove[0])
    setTaskList(taskList);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task,index) => (
              <div key={task.id}>
                 <Task index = {index} task = {task} taskList = {taskList} setTaskList = {setTaskList} />
              </div>
              ))}
              {provided.placeholder}
            </div>)}      
         </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Taskes
