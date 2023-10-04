import * as types from '../actions/commentActions'

const initialState = {
  comments: [],
  loading: false,
  error: null
}

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.COMMENTS_FETCH_REQUESTED:
    case types.COMMENT_ADD_REQUESTED:
    case types.COMMENT_EDIT_REQUESTED:
    case types.COMMENT_DELETE_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case types.COMMENTS_FETCH_SUCCEEDED:
      return {
        ...state,
        comments: action.payload.data,
        loading: false,
        error: null
      }
    case types.COMMENT_ADD_SUCCEEDED:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
        error: null
      }
    case types.COMMENT_EDIT_SUCCEEDED:
      return {
        ...state,
        comments: [...state.comments.map(comment =>
          comment.id === action.payload.id
            ? {...comment, message: action.payload.message}
            : comment
        )],
        loading: false,
        error: null
      }
    case types.COMMENT_DELETE_SUCCEEDED:
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !== action.payload.id)],
        loading: false,
        error: null
      }
    case types.COMMENTS_FETCH_FAILED:
    case types.COMMENT_ADD_FAILED:
    case types.COMMENT_EDIT_FAILED:
    case types.COMMENT_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
