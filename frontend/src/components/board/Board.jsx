import React from 'react'
import './Board.scss'
import Task from "../task/Task"
import {Droppable} from "react-beautiful-dnd"

const Board = ({ board, tasks}) => {
  return (
    <div className='board'>
      <div className='board_body'>
        <div className='board_title'>{ board.status }</div>
        <Droppable droppableId={board.id}>
          {
            (provided, snapshot) =>
              <div className={`board_content ${snapshot.isDraggingOver ? 'is-dragged-over' : ''}`}
                   {...provided.droppableProps}
                   ref={provided.innerRef}>
                {
                  tasks
                    .sort((a, b) => a['order'] - b['order'])
                    .map((task, index) => <Task key={task.id} task={task} index={index} />)
                }
                {provided.placeholder}
              </div>
          }
        </Droppable>
      </div>
    </div>
  );
};

export default Board
