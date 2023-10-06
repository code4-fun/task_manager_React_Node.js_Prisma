export const TASK_UPDATE_REQUESTED = 'TASK_UPDATE_REQUESTED'
export const TASK_UPDATE_SUCCEEDED = 'TASK_UPDATE_SUCCEEDED'
export const TASK_UPDATE_FAILED = 'TASK_UPDATE_FAILED'

export const TASK_FETCH_REQUESTED = 'TASK_FETCH_REQUESTED'
export const TASK_FETCH_SUCCEEDED = 'TASK_FETCH_SUCCEEDED'
export const TASK_FETCH_FAILED = 'TASK_FETCH_FAILED'

export const TASK_ADD_REQUESTED = 'TASK_ADD_REQUESTED'
export const TASK_ADD_SUCCEEDED = 'TASK_ADD_SUCCEEDED'
export const TASK_ADD_FAILED = 'TASK_ADD_FAILED'

export const TASK_DELETE_REQUESTED = 'TASK_DELETE_REQUESTED'
export const TASK_DELETE_SUCCEEDED = 'TASK_DELETE_SUCCEEDED'
export const TASK_DELETE_FAILED = 'TASK_DELETE_FAILED'

export const TASKS_SEARCH_REQUESTED = 'TASKS_SEARCH_REQUESTED'
export const TASKS_SEARCH_SUCCEEDED = 'TASKS_SEARCH_SUCCEEDED'
export const TASKS_SEARCH_FAILED = 'TASKS_SEARCH_FAILED'

export const SEARCH_RESULT_DELETE = 'SEARCH_RESULT_DELETE'

export const updateTaskRequested = task => ({
  type: TASK_UPDATE_REQUESTED,
  payload: task
})

export const updateTaskSucceeded = task => ({
  type: TASK_UPDATE_SUCCEEDED,
  payload: task
})

export const updateTaskFailed = error => ({
  type: TASK_UPDATE_FAILED,
  payload: error
})

export const fetchTaskRequested = taskId => ({
  type: TASK_FETCH_REQUESTED,
  payload: taskId
})

export const fetchTaskSucceeded = task => ({
  type: TASK_FETCH_SUCCEEDED,
  payload: task
})

export const fetchTaskFailed = error => ({
  type: TASK_FETCH_FAILED,
  payload: error
})

export const addTaskRequested = task => ({
  type: TASK_ADD_REQUESTED,
  payload: task
})

export const addTaskSucceeded = task => ({
  type: TASK_ADD_SUCCEEDED,
  payload: task
})

export const addTaskFailed = error => ({
  type: TASK_ADD_FAILED,
  payload: error
})

export const deleteTaskRequested = id => ({
  type: TASK_DELETE_REQUESTED,
  payload: id
})

export const deleteTaskSucceeded = id => ({
  type: TASK_DELETE_SUCCEEDED,
  payload: id
})

export const deleteTaskFailed = error => ({
  type: TASK_DELETE_FAILED,
  payload: error
})

export const searchTasksRequested = searchString => ({
  type: TASKS_SEARCH_REQUESTED,
  payload: searchString
})

export const searchTasksSucceeded = searchResult => ({
  type: TASKS_SEARCH_SUCCEEDED,
  payload: searchResult
})

export const searchTasksFailed = error => ({
  type: TASKS_SEARCH_FAILED,
  payload: error
})

export const deleteSearchResult = () => ({
  type: SEARCH_RESULT_DELETE
})
