export const COMMENTS_FETCH_REQUESTED = 'COMMENTS_FETCH_REQUESTED'
export const COMMENTS_FETCH_SUCCEEDED = 'COMMENTS_FETCH_SUCCEEDED'
export const COMMENTS_FETCH_FAILED = 'COMMENTS_FETCH_FAILED'

export const COMMENT_ADD_REQUESTED = "COMMENT_ADD_REQUESTED"
export const COMMENT_ADD_SUCCEEDED = "COMMENT_ADD_SUCCEEDED"
export const COMMENT_ADD_FAILED = "COMMENT_ADD_FAILED"

export const COMMENT_EDIT_REQUESTED = "COMMENT_EDIT_REQUESTED"
export const COMMENT_EDIT_SUCCEEDED = "COMMENT_EDIT_SUCCEEDED"
export const COMMENT_EDIT_FAILED = "COMMENT_EDIT_FAILED"

export const COMMENT_DELETE_REQUESTED = "COMMENT_DELETE_REQUESTED"
export const COMMENT_DELETE_SUCCEEDED = "COMMENT_DELETE_SUCCEEDED"
export const COMMENT_DELETE_FAILED = "COMMENT_DELETE_FAILED"

export const fetchCommentsRequested = taskId => ({
  type: COMMENTS_FETCH_REQUESTED,
  payload: taskId
})

export const fetchCommentsSucceeded = comments => ({
  type: COMMENTS_FETCH_SUCCEEDED,
  payload: comments
})

export const fetchCommentsFailed = error => ({
  type: COMMENTS_FETCH_FAILED,
  payload: error
})

export const addCommentRequested = comment => {
  return {
    type: COMMENT_ADD_REQUESTED,
    payload: comment
  }
}

export const addCommentSucceeded = comment => {
  return {
    type: COMMENT_ADD_SUCCEEDED,
    payload: comment
  }
}

export const addCommentFailed = error => {
  return {
    type: COMMENT_ADD_FAILED,
    payload: error
  }
}

export const editCommentRequested = comment => {
  return {
    type: COMMENT_EDIT_REQUESTED,
    payload: comment
  }
}

export const editCommentSucceeded = comment => {
  return {
    type: COMMENT_EDIT_SUCCEEDED,
    payload: comment
  }
}

export const editCommentFailed = error => {
  return {
    type: COMMENT_EDIT_FAILED,
    payload: error
  }
}

export const deleteCommentRequested = data => {
  return {
    type: COMMENT_DELETE_REQUESTED,
    payload: data
  }
}

export const deleteCommentSucceeded = id => {
  return {
    type: COMMENT_DELETE_SUCCEEDED,
    payload: id
  }
}

export const deleteCommentFailed = error => {
  return {
    type: COMMENT_DELETE_FAILED,
    payload: error
  }
}
