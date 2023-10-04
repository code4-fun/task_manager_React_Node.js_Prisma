import React from 'react'
import './Subtasks.scss'
import IconBtn from "../ui/iconBtn/IconBtn"
import {FaTrash} from "react-icons/fa"

const Subtasks = ({subtasks, removeSubtask, toggleSubtask}) => {
  return (
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
  );
};

export default Subtasks
