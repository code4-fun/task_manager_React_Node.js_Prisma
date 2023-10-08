import React, {useState} from 'react'
import './TaskForm.scss'
import CustomInput from "../ui/input/CustomInput"
import CustomTextarea from "../ui/textarea/CustomTextarea"
import CustomButton from "../ui/button/CustomButton"
import moment from "moment"
import CustomSelect from "../ui/customSelect/CustomSelect"
import {useSelector} from "react-redux"

const TaskForm = ({onSubmit, autoFocus = false, buttonText}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateState, setDateState] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [priority, setPriority] = useState('')
  const [board, setBoard] = useState('')
  const {boards, projectId} = useSelector(store => store.boards)
  const {taskError} = useSelector(store => store.boards)

  function handleSubmit(e) {
    e.preventDefault()
    // order value of the bottom task on selected board
    const lastOrderValue = boards.filter(item => item.status === board)[0].tasks.slice(-1)[0]?.order
    const order = lastOrderValue ? lastOrderValue + 1 : 0
    const date = `${dateState}T00:00:00.000Z`
    onSubmit({title, description, date, priority, board, order, projectId})
  }

  return (
    <>
      {
        taskError ? <div className="error-msg">{taskError}</div> : ''
      }
      <form onSubmit={handleSubmit} className='task_form'>
        <div className='task_form_title'>Create task</div>
        <CustomInput
          autoFocus={autoFocus}
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text'
          placeholder='Task title' />
        <CustomTextarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder='Task description'
          rows='10' />
        <div className='completion_date'>
          <div  className='name'>Completion date</div>
          <input
            type='date'
            value={dateState}
            min={new Date().toISOString().substr(0, 10)}
            onChange={e => setDateState(e.target.value)}
          />
        </div>
        <div className='priority_selector'>
          <div className='name'>Priority</div>
          <CustomSelect
            initialValue={'MEDIUM'}
            onChange={setPriority}
            options={['LOW', 'MEDIUM', 'HIGH']}
          />
        </div>
        <div className='board_selector'>
          <div className='name'>Board</div>
          <CustomSelect
            initialValue={'Queue'}
            onChange={setBoard}
            options={['Queue', 'Development', 'Done']}
          />
        </div>
        <CustomButton>{buttonText}</CustomButton>
      </form>
    </>
  )
}

export default TaskForm
