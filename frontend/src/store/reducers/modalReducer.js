import {TOGGLE_MODAL} from '../actions/modalActions'

const initialState = {
  modalVisible: false,
  modalContent: null
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: action.payload.modalVisible,
        modalContent: action.payload.modalContent
      }
    default:
      return state
  }
}
