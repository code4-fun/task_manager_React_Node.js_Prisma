import * as types from '../actions/taskActions'

const initialState = {
  task: null,
  loading: false,
  error: null
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TASK_UPDATE_REQUESTED:
    case types.TASK_FETCH_REQUESTED:
      return {
        ...state,
        loading: true
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
    case types.TASK_UPDATE_FAILED:
    case types.TASK_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}
