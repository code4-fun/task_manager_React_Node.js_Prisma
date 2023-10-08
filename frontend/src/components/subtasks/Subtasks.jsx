import React from 'react'
import './Subtasks.scss'
import IconBtn from "../ui/iconBtn/IconBtn"
import {FaTrash} from "react-icons/fa"
import TaskInput from "../ui/taskInput/TaskInput"

const Subtasks = ({subtasks, addSubtask, removeSubtask, toggleSubtask}) => {
  return (
    <div className='subtasks_component'>
      {
        subtasks?.length > 0 &&
          <div className="subtasks_body">
            <div className='subtasks_title'>Subtasks</div>
            <div className="subtask_list">
              {subtasks?.map((subtask) => (
                <div key={subtask.id} className="subtask_list_line">
                  <input
                    id={subtask.id}
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={e => {
                      e.preventDefault()
                      toggleSubtask(subtask.id)
                    }} />
                  <label htmlFor={subtask.id}>{subtask.description}</label>
                  <div className='subtask_placeholder'> </div>
                  <IconBtn onClick={() => removeSubtask(subtask.id)} Icon={FaTrash} aria-label="Delete" color="danger" />
                </div>
              ))}
            </div>
          </div>
      }
      <TaskInput
        text="Add subtask"
        placeholder="Task description"
        initialValue=""
        onSubmit={description => addSubtask({description: description})}
      />
    </div>
  );
};

export default Subtasks
