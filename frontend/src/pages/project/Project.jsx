import React, {useEffect} from 'react'
import './Project.scss'
import {useParams} from "react-router-dom"
import Board from "../../components/board/Board"
import {DragDropContext} from "react-beautiful-dnd"
import {useDispatch, useSelector} from "react-redux"
import CustomModal from "../../components/ui/modal/CustomModal"
import {fetchBoardsRequested, fetchBoardsSucceeded} from "../../store/actions/boardActions"
import {updateTaskRequested} from "../../store/actions/taskActions"
import {selectAllBoards} from "../../store/reducers/boardReducer";

const Project = () => {
  const {id: projectId} = useParams()
  const dispatch = useDispatch()
  const boards = useSelector(selectAllBoards)

  const onDragEnd = (result) => {
    const {source, destination} = result

    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    const startBoard = boards.filter(item => item.id === source.droppableId)[0]
    const finishBoard = boards.filter(item => item.id === destination.droppableId)[0]

    if(source.droppableId === destination.droppableId){
      const newTasks = [...startBoard.tasks]

      let draggedTask = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, ...draggedTask)
      newTasks.forEach((task, index) => task.order = index)
      const newBoard = {...startBoard, tasks: newTasks}

      const newBoards = [...boards.filter(board => board.id !== newBoard.id), newBoard]
        .sort((a, b) => a['order'] - b['order'])
      dispatch(fetchBoardsSucceeded({data: newBoards}))

      newBoard.tasks.forEach((task, index) => dispatch(updateTaskRequested({taskId: task.id, order: index})))
      return
    }

    const newStartTasks = [...startBoard.tasks]
    let draggedTask = newStartTasks.splice(source.index, 1)[0]
    newStartTasks.forEach((task, index) => task.order = index)
    const newStartBoard = {...startBoard, tasks: newStartTasks}

    const newFinishTasks = [...finishBoard.tasks]
    newFinishTasks.splice(destination.index, 0, {...draggedTask, boardId: destination.droppableId})
    newFinishTasks.forEach((task, index) => task.order = index)
    const newFinishBoard = {...finishBoard, tasks: newFinishTasks}

    const newBoards = [...boards.filter(board => board.id !== newStartBoard.id
      && board.id !== newFinishBoard.id), newStartBoard, newFinishBoard]
      .sort((a, b) => a['order'] - b['order'])
    dispatch(fetchBoardsSucceeded({data: newBoards}))

    newStartBoard.tasks.forEach((task, index) => dispatch(updateTaskRequested({taskId: task.id, boardId: task.boardId, order: index})))
    newFinishBoard.tasks.forEach((task, index) => dispatch(updateTaskRequested({taskId: task.id, boardId: task.boardId, order: index})))
  }

  useEffect(() => {
    dispatch(fetchBoardsRequested(projectId))
  }, [])

  return (
    <>
      <CustomModal />
      <div className='project'>
        <DragDropContext onDragEnd={result => onDragEnd(result)}>
          {
            boards.map(board => <Board key={board.id} board={board} tasks={board.tasks} />)
          }
        </DragDropContext>
      </div>
    </>
  )
}

export default Project
