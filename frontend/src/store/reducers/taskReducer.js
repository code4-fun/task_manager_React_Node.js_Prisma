import * as types from '../actions/taskActions'
import * as subtaskTypes from "../actions/subtaskActions";

const initialState = {
  task: null,
  loading: false,
  error: null,
  subtaskLoading: false,
  subtaskError: null
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TASK_UPDATE_REQUESTED:
    case types.TASK_FETCH_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case subtaskTypes.SUBTASK_ADD_REQUESTED:
    case subtaskTypes.SUBTASK_DELETE_REQUESTED:
    case subtaskTypes.SUBTASK_TOGGLE_REQUESTED:
      return {
        ...state,
        subtaskLoading: true
      }
    case types.TASK_UPDATE_SUCCEEDED:
      return {
        ...state,
        task: action.payload.data,
        loading: false,
        error: null
      }
    case types.TASK_FETCH_SUCCEEDED:
      return {
        ...state,
        task: action.payload.data,
        loading: false,
        error: null
      }
    case subtaskTypes.SUBTASK_ADD_SUCCEEDED:
      return {
        ...state,
        task: {...state.task, subtasks: [...state.task.subtasks.push(action.payload)]},
        subtaskLoading: false,
        subtaskError: null
      }
    case subtaskTypes.SUBTASK_DELETE_SUCCEEDED:
      return {
        ...state,
        task: {...state.task, subtasks: [...state.task.subtasks.filter(subtask => subtask.id !== action.payload.id)]},
        subtaskLoading: false,
        subtaskError: null
      }
    case subtaskTypes.SUBTASK_TOGGLE_SUCCEEDED:
      return {
        ...state,
        task: {...state.task, subtasks: [...state.task.subtasks.map(subtask => {
          if(subtask.id !== action.payload.id){
            return subtask
          } else {
            return {...subtask, completed: action.payload.completed}
          }
          })]},
        subtaskLoading: false,
        subtaskError: null
      }
    case types.TASK_UPDATE_FAILED:
    case types.TASK_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case subtaskTypes.SUBTASK_ADD_FAILED:
    case subtaskTypes.SUBTASK_DELETE_FAILED:
    case subtaskTypes.SUBTASK_TOGGLE_FAILED:
      return {
        ...state,
        subtaskError: action.payload,
        subtaskLoading: false
      }
    default:
      return state
  }
}
