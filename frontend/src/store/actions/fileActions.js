export const FILE_UPLOAD_REQUESTED = 'FILE_UPLOAD_REQUESTED'
export const FILE_UPLOAD_SUCCEEDED = 'FILE_UPLOAD_SUCCEEDED'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const FILE_DELETE_REQUESTED = 'FILE_DELETE_REQUESTED'
export const FILE_DELETE_SUCCEEDED = 'FILE_DELETE_SUCCEEDED'
export const FILE_DELETE_FAILED = 'FILE_DELETE_FAILED'

export const uploadFileRequested = fileName => ({
  type: FILE_UPLOAD_REQUESTED,
  payload: fileName
})

export const uploadFileSucceeded = file => ({
  type: FILE_UPLOAD_SUCCEEDED,
  payload: file
})

export const uploadFileFailed = error => ({
  type: FILE_UPLOAD_FAILED,
  payload: error
})

export const deleteFileRequested = file => ({
  type: FILE_DELETE_REQUESTED,
  payload: file
})

export const deleteFileSucceeded = id => ({
  type: FILE_DELETE_SUCCEEDED,
  payload: id
})

export const deleteFileFailed = error => ({
  type: FILE_DELETE_FAILED,
  payload: error
})
