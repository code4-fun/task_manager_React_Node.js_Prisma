import React, {useEffect, useState} from 'react'
import './TaskMajor.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchTaskRequested, updateTaskRequested} from "../../store/actions/taskActions"
import CommentList from "../commentList/CommentList"
import CommentForm from "../commentForm/CommentForm"
import {addCommentRequested, fetchCommentsRequested} from "../../store/actions/commentActions"
import {getCommentsByParentId} from "../../utils"
import moment from 'moment'
import TaskInput from "../ui/taskInput/TaskInput"
import CustomSelect from "../ui/customSelect/CustomSelect"
import Subtasks from "../subtasks/Subtasks"
import Files from "../files/Files"
import {addSubtaskRequested, deleteSubtaskRequested, toggleSubtaskRequested} from "../../store/actions/subtaskActions"

const TaskMajor = ({taskId}) => {
  const dispatch = useDispatch()
  const {task, loading: loadingTask, error: taskError} = useSelector(store => store.tasks)
  const {comments, loading: loadingComments, error: commentsError} = useSelector(store => store.comments)
  const rootComments = getCommentsByParentId(comments).null
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    dispatch(fetchTaskRequested(taskId))
  }, [])

  const onCommentCreate = message => {
    dispatch(addCommentRequested({taskId, message}))
  }

  const updateTask = value => {
    if(value[Object.keys(value)[0]] && task[Object.keys(value)[0]] !== Object.values(value)[0]){
      dispatch(updateTaskRequested({taskId: taskId, ...value}))
    }
  }

  const addSubtask = value => {
    if(value[Object.keys(value)[0]] && task[Object.keys(value)[0]] !== Object.values(value)[0]){
      dispatch(addSubtaskRequested({taskId: taskId, ...value}))
    }
  }

  const removeSubtask = subtaskId => {
    dispatch(deleteSubtaskRequested({taskId: taskId, subtaskId}))
  }

  const toggleSubtask = subtaskId => {
    dispatch(toggleSubtaskRequested({taskId: taskId, subtaskId}))
  }

  if(taskError) return <div className="error-msg">{taskError}</div>

  return (
    <div className='task-major_body'>
      <div className='task-major_header'>
        <div className='task-major_number'>#{task?.number}</div>
        <div>{`Created on ${moment(new Date(task?.createdAt)).format('MMM D, YYYY')}`}</div>
      </div>
      <div className='task-major_content'>
        <div className='task-major_title'>
          <div className='name'>Title</div>
          {
            loadingTask
              ?
              <div className='loading_block'>Loading...</div>
              :
              <TaskInput
                text={task?.title}
                initialValue={task?.title}
                placeholder="Enter title"
                onSubmit={title => updateTask({title: title})}
              />
          }
        </div>
        <div className='task-major_description'>
          <div className='name'>Description</div>
          {
            loadingTask
              ?
              <div className='loading_block'>Loading...</div>
              :
              <TaskInput
                text={task?.description || 'Add description'}
                initialValue={task?.description}
                placeholder="Enter description"
                onSubmit={description => updateTask({description: description})}
              />
          }
        </div>
        <div className='task-major_date'>
          <div  className='name'>Completion date</div>
          {
            loadingTask
              ?
              <div className='loading_block'>Loading...</div>
              :
              <input
                type="date"
                defaultValue={moment(new Date(task?.completedAt)).format('YYYY-MM-DD')}
                min={new Date().toISOString().substr(0, 10)}
                onChange={e => updateTask({completedAt: `${e.target.value}T00:00:00.000Z`})}
              />
          }
        </div>
        <div className='task-major_status'>
          <div className='name'>Current status</div>
          <div>{task?.board?.status}</div>
        </div>
        <div className='task-major_priority'>
          <div className='name'>Priority</div>
          {
            loadingTask
              ?
              <div className='loading_block'>Loading...</div>
              :
              <CustomSelect
                initialValue={task?.priority}
                onChange={priority => updateTask({priority: priority})}
                options={['LOW', 'MEDIUM', 'HIGH']}
              />
          }
        </div>
        <div className='task-major_subtasks'>
          <div className='name'>Subtasks</div>
          <Subtasks
            removeSubtask={removeSubtask}
            toggleSubtask={toggleSubtask}
            subtasks={task?.subtasks} />
        </div>
        <TaskInput
          text={"Add subtask"}
          placeholder="Task description"
          onSubmit={description => addSubtask({description: description})}
        />
        <div className='task-major_files'>
          <Files files={task?.files} taskId={taskId} />
        </div>
      </div>

      <div className='task-major_comments'>
        <div className='show_comments_button'
             onClick={() => {
               dispatch(fetchCommentsRequested(task.id))
               setShowComments(prev => !prev)
             }}>{showComments ? 'Hide comments' : 'Show comments'}</div>
        {
          showComments && <>
            <CommentForm loading={loadingComments} error={commentsError} onSubmit={onCommentCreate} />
            {
              rootComments != null && rootComments.length > 0
                ?
                <div className="mt-4">
                  <CommentList comments={rootComments} />
                </div>
                :
                <div>
                  No comments
                </div>
              }
            </>
        }
      </div>
    </div>
  )
}

export default TaskMajor
