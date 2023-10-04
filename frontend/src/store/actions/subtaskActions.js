export const SUBTASK_ADD_REQUESTED = 'SUBTASK_ADD_REQUESTED'
export const SUBTASK_ADD_SUCCEEDED = 'SUBTASK_ADD_SUCCEEDED'
export const SUBTASK_ADD_FAILED = 'SUBTASK_ADD_FAILED'

export const SUBTASK_DELETE_REQUESTED = 'SUBTASK_DELETE_REQUESTED'
export const SUBTASK_DELETE_SUCCEEDED = 'SUBTASK_DELETE_SUCCEEDED'
export const SUBTASK_DELETE_FAILED = 'SUBTASK_DELETE_FAILED'

export const SUBTASK_TOGGLE_REQUESTED = 'SUBTASK_TOGGLE_REQUESTED'
export const SUBTASK_TOGGLE_SUCCEEDED = 'SUBTASK_TOGGLE_SUCCEEDED'
export const SUBTASK_TOGGLE_FAILED = 'SUBTASK_TOGGLE_FAILED'

export const addSubtaskRequested = description => ({
  type: SUBTASK_ADD_REQUESTED,
  payload: description
})

export const addSubtaskSucceeded = subtask => ({
  type: SUBTASK_ADD_SUCCEEDED,
  payload: subtask
})

export const addSubtaskFailed = error => ({
  type: SUBTASK_ADD_FAILED,
  payload: error
})

export const deleteSubtaskRequested = subtask => ({
  type: SUBTASK_DELETE_REQUESTED,
  payload: subtask
})

export const deleteSubtaskSucceeded = id => ({
  type: SUBTASK_DELETE_SUCCEEDED,
  payload: id
})

export const deleteSubtaskFailed = error => ({
  type: SUBTASK_DELETE_FAILED,
  payload: error
})

export const toggleSubtaskRequested = subtask => ({
  type: SUBTASK_TOGGLE_REQUESTED,
  payload: subtask
})

export const toggleSubtaskSucceeded = subtask => ({
  type: SUBTASK_TOGGLE_SUCCEEDED,
  payload: subtask
})

export const toggleSubtaskFailed = error => ({
  type: SUBTASK_TOGGLE_FAILED,
  payload: error
})
