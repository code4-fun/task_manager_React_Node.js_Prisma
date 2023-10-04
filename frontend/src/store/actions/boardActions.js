export const BOARDS_FETCH_REQUESTED = 'BOARDS_FETCH_REQUESTED'
export const BOARDS_FETCH_SUCCEEDED = 'BOARDS_FETCH_SUCCEEDED'
export const BOARDS_FETCH_FAILED = 'BOARDS_FETCH_FAILED'

export const fetchBoardsRequested = projectId => ({
  type: BOARDS_FETCH_REQUESTED,
  payload: projectId
})

export const fetchBoardsSucceeded = boards => ({
  type: BOARDS_FETCH_SUCCEEDED,
  payload: boards
})

export const fetchBoardsFailed = error => ({
  type: BOARDS_FETCH_FAILED,
  payload: error
})
