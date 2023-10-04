import * as types from '../actions/boardActions'
import * as taskTypes from '../actions/taskActions'

const initialState = {
  boards: [],
  projectId: '',
  loading: false,
  error: null,
  loadingTask: false,
  taskError: null
}

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BOARDS_FETCH_REQUESTED:
      return {
        ...state,
        projectId: action.payload,
        loading: true
      }
    case taskTypes.TASK_ADD_REQUESTED:
    case taskTypes.TASK_DELETE_REQUESTED:
      return {
        ...state,
        loadingTask: true
      }
    case types.BOARDS_FETCH_SUCCEEDED:
      return {
        ...state,
        boards: action.payload.data,
        loading: false,
        error: null
      }
    case taskTypes.TASK_ADD_SUCCEEDED:
      return {
        ...state,
        boards: [...state.boards.map(board => {
          if(board.id === action.payload.boardId){
            board.tasks.push(action.payload)
            return board
          } else {
            return board
          }
        })],
        loadingTask: false,
        taskError: null
      }
    case taskTypes.TASK_DELETE_SUCCEEDED:
      return {
        ...state,
        boards: [...state.boards.map(board => {
          return {...board, tasks: board.tasks.filter(task => task.id !== action.payload.id)}
        })],
        loading: false,
        error: null
      }
    case taskTypes.TASK_UPDATE_SUCCEEDED:
      return {
        ...state,
        boards: [...state.boards.map(board => {
          if(board.id !== action.payload.data.board.id){
            return board
          } else {
            board.tasks = board.tasks.map(task => {
              if (task.id !== action.payload.data.id) {
                return task
              } else {
                let {description, completedAt, board, subtasks, files, ...rest} = {...action.payload.data}
                return rest
              }
            })
            return board
          }
        })],
        loading: false,
        error: null
      }
    case types.BOARDS_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case taskTypes.TASK_ADD_FAILED:
    case taskTypes.TASK_DELETE_FAILED:
      return {
        ...state,
        taskError: action.payload,
        loadingTask: false
      }
    default:
      return state
  }
}
