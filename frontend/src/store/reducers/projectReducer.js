import * as types from '../actions/projectActions'

const initialState = {
  projects: [],
  loading: false,
  error: null
}

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROJECTS_FETCH_REQUESTED:
    case types.PROJECT_ADD_REQUESTED:
    case types.PROJECT_DELETE_REQUESTED:
    case types.PROJECT_EDIT_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.PROJECTS_FETCH_SUCCEEDED:
      return {
        ...state,
        projects: action.payload.data,
        loading: false,
        error: null
      }
    case types.PROJECT_ADD_SUCCEEDED:
      return {
        ...state,
        projects: [{...action.payload}, ...state.projects],
        loading: false,
        error: null
      }
    case types.PROJECT_DELETE_SUCCEEDED:
      return {
        ...state,
        projects: [...state.projects.filter(project => project.id !== action.payload.id)],
        loading: false,
        error: null
      }
    case types.PROJECT_EDIT_SUCCEEDED:
      return {
        ...state,
        projects: [...state.projects.map(project => {
          if(project.id !== action.payload.id){
            return project
          } else {
            return {
              ...action.payload
            }
          }
        })],
        loading: false,
        error: null
      }
    case types.PROJECTS_FETCH_FAILED:
    case types.PROJECT_ADD_FAILED:
    case types.PROJECT_DELETE_FAILED:
    case types.PROJECT_EDIT_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case types.PROJECT_REMOVE_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}
