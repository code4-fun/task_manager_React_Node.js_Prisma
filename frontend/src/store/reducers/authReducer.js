import {SAVE_USER} from "../actions/authActions";

const initialState = {
  userName: ''
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userName: action.payload
      }
    default:
      return state
  }
}
