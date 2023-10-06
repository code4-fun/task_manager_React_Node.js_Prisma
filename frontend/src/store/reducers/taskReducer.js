import * as types from '../actions/taskActions'
import * as subtaskTypes from "../actions/subtaskActions"
import * as fileTypes from "../actions/fileActions"

const initialState = {
  task: null,
  loading: false,
  error: null,
  subtaskLoading: false,
  subtaskError: null,
  searchResult: [],
  searchResultLoading: false,
  searchResultError: null,
  fileLoading: false,
  fileError: null
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
    case types.TASKS_SEARCH_REQUESTED:
      return {
        ...state,
        searchResultLoading: true
      }
    case fileTypes.FILE_UPLOAD_REQUESTED:
    case fileTypes.FILE_DELETE_REQUESTED:
      return {
        ...state,
        fileLoading: true
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
    case types.TASKS_SEARCH_SUCCEEDED:
      return {
        ...state,
        searchResult: action.payload,
        searchResultError: null,
        searchResultLoading: false
      }
    case fileTypes.FILE_UPLOAD_SUCCEEDED:
      return {
        ...state,
        task: {...state.task, files: [...state.task.files.push(action.payload)]},
        fileLoading: false,
        fileError: null
      }
    case fileTypes.FILE_DELETE_SUCCEEDED:
      return {
        ...state,
        task: {...state.task, files: [...state.task.files.filter(file => file.id !== action.payload.id)]},
        fileLoading: false,
        fileError: null
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
    case types.TASKS_SEARCH_FAILED:
      return {
        ...state,
        searchResultError: action.payload,
        searchResultLoading: false
      }
    case types.SEARCH_RESULT_DELETE:
      return {
        ...state,
        searchResult: []
      }
    case fileTypes.FILE_UPLOAD_FAILED:
    case fileTypes.FILE_DELETE_FAILED:
      return {
        ...state,
        fileError: action.payload,
        fileLoading: false
      }
    default:
      return state
  }
}
