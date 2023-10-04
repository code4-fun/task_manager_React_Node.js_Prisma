import React, { useState } from "react"
import './TaskInput.scss'

const TaskInput = ({text, onSubmit, placeholder, buttonText}) => {
  const [isTaskInput, setIsTaskInput] = useState(false)
  const [inputText, setInputText] = useState(text || "")

  const submitForm = (e) => {
    e.preventDefault()
    if (inputText && onSubmit) {
      onSubmit(inputText)
    }
    setIsTaskInput(false)
  }

  return (
    <div className="task-input">
      {isTaskInput ? (
        <form className='task-input-edit' onSubmit={submitForm}>
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus />
          <div className="task-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <div onClick={() => setIsTaskInput(false)} className="close-icon">&times;</div>
          </div>
        </form>
      ) : (
        <div className='task-input-display' onClick={() => setIsTaskInput(true)}>
          {text}
        </div>
      )}
    </div>
  )
}

export default TaskInput
