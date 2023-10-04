export const PROJECTS_FETCH_REQUESTED = 'PROJECTS_FETCH_REQUESTED'
export const PROJECTS_FETCH_SUCCEEDED = 'PROJECTS_FETCH_SUCCEEDED'
export const PROJECTS_FETCH_FAILED = 'PROJECTS_FETCH_FAILED'

export const PROJECT_ADD_REQUESTED = "PROJECT_ADD_REQUESTED"
export const PROJECT_ADD_SUCCEEDED = "PROJECT_ADD_SUCCEEDED"
export const PROJECT_ADD_FAILED = "PROJECT_ADD_FAILED"

export const PROJECT_DELETE_REQUESTED = "PROJECT_DELETE_REQUESTED"
export const PROJECT_DELETE_SUCCEEDED = "PROJECT_DELETE_SUCCEEDED"
export const PROJECT_DELETE_FAILED = "PROJECT_DELETE_FAILED"

export const PROJECT_EDIT_REQUESTED = "PROJECT_EDIT_REQUESTED"
export const PROJECT_EDIT_SUCCEEDED = "PROJECT_EDIT_SUCCEEDED"
export const PROJECT_EDIT_FAILED = "PROJECT_EDIT_FAILED"

export const fetchProjectsRequested = () => ({
  type: PROJECTS_FETCH_REQUESTED
})

export const fetchProjectsSucceeded = projects => ({
  type: PROJECTS_FETCH_SUCCEEDED,
  payload: projects
})

export const fetchProjectsFailed = error => ({
  type: PROJECTS_FETCH_FAILED,
  payload: error
})

export const addProjectRequested = project => ({
  type: PROJECT_ADD_REQUESTED,
  payload: project
})

export const addProjectSucceeded = project => ({
  type: PROJECT_ADD_SUCCEEDED,
  payload: project
})

export const addProjectFailed = error => ({
  type: PROJECT_ADD_FAILED,
  payload: error
})

export const deleteProjectRequested = id => ({
  type: PROJECT_DELETE_REQUESTED,
  payload: id
})

export const deleteProjectSucceeded = id => ({
  type: PROJECT_DELETE_SUCCEEDED,
  payload: id
})

export const deleteProjectFailed = error => ({
  type: PROJECT_DELETE_FAILED,
  payload: error
})

export const editProjectRequested = project => ({
  type: PROJECT_EDIT_REQUESTED,
  payload: project
})

export const editProjectSucceeded = project => ({
  type: PROJECT_EDIT_SUCCEEDED,
  payload: project
})

export const editProjectFailed = error => ({
  type: PROJECT_EDIT_FAILED,
  payload: error
})
