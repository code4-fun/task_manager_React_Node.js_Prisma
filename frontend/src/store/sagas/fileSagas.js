import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/fileActions'
import {uploadFileApi, deleteFileApi} from "../../api/files";

function* uploadFile({payload}){
  try {
    const newFile = yield call(uploadFileApi, payload)
    yield put(types.uploadFileSucceeded(newFile))
  } catch (e) {
    yield put(types.uploadFileFailed(e))
  }
}

function* deleteFile({payload}){
  try {
    const removedFileId = yield call(deleteFileApi, payload)
    yield put(types.deleteFileSucceeded(removedFileId))
  } catch (e) {
    yield put(types.deleteFileFailed(e))
  }
}

function* onUploadFile(){
  yield takeLatest(types.FILE_UPLOAD_REQUESTED, uploadFile)
}

function* onDeleteFile(){
  yield takeLatest(types.FILE_DELETE_REQUESTED, deleteFile)
}

export default function* rootFileSaga() {
  yield all([
    fork(onUploadFile),
    fork(onDeleteFile)
  ])
}
