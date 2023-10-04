import React from 'react'
import './Subtasks.scss'
import IconBtn from "../ui/iconBtn/IconBtn"
import {FaTrash} from "react-icons/fa"

const Subtasks = ({subtasks}) => {
  const updateTask = () => {
  }

  const removeTask = () => {
  }

  return (
    <div className="subtask_list">
      {subtasks?.map((item) => (
        <div key={item.id} className="subtask_list_line">
          <input
            id={item.id}
            type="checkbox"
            defaultChecked={item.completed}
            onChange={e => updateTask(item.id, e.target.checked)} />
          <label htmlFor={item.id}>{item.description}</label>
          <div className='subtask_placeholder'> </div>
          <IconBtn onClick={() => removeTask(item.id)} Icon={FaTrash} aria-label="Delete" color="danger" />
        </div>
      ))}
    </div>
  );
};

export default Subtasks
