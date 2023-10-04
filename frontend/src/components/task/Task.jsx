import React from 'react'
import './Task.scss'
import {Draggable} from "react-beautiful-dnd"
import {useDispatch} from "react-redux";
import {toggleModal} from "../../store/actions/modalActions"
import moment from 'moment'
import TaskMajor from "../taskMajor/TaskMajor"
import IconBtn from "../ui/iconBtn/IconBtn"
import {FaTrash} from "react-icons/fa"
import {deleteTaskRequested} from "../../store/actions/taskActions"

const Task = ({ task, index }) => {
  const dispatch = useDispatch()

  const atWorkDays = (date) => {
    const dateOfCreation = moment(date).utc()
    const now = moment().utc()
    return now.diff(dateOfCreation, 'days')
  }

  const onTaskDelete = (e, taskId) => {
    e.stopPropagation()
    dispatch(deleteTaskRequested(taskId))
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {
          (provided, snapshot) =>
            <div className={`task ${snapshot.isDragging ? 'is-dragging' : ''}`}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                 ref={provided.innerRef}>
              <div className='task_body'
                   onClick={() => dispatch(
                     toggleModal({
                       modalVisible: true,
                       modalContent: <TaskMajor taskId={task.id} />
                     })
                   )}>
                <div className='task_header'>
                  <div className='task_number'>#{task.number}</div>
                  <IconBtn onClick={e => onTaskDelete(e, task.id)} Icon={FaTrash} aria-label="Delete" color="danger" />
                </div>
                <div className='task_content'>
                  <div className='task_title'>
                    {task.title.length < 70 ? task.title : task.title.substr(0, 69) + '...'}
                  </div>
                </div>
                <div className='task_footer'>
                  <div className={`task_priority
                  ${task.priority === 'LOW' ? 'green' : ''}
                  ${task.priority === 'MEDIUM' ? 'yellow' : ''}
                  ${task.priority === 'HIGH' ? 'red' : ''}
                  `}>{task.priority}</div>
                  <div className='task_in-work'>
                    {`${atWorkDays(task.createdAt)} days at work`}
                  </div>
                </div>
              </div>
            </div>
        }
      </Draggable>
    </>
  )
}

export default Task
