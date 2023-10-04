import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/subtaskActions'
import {createSubtaskApi, toggleSubtaskApi, deleteSubtaskApi} from "../../api/subtasks"

function* addSubtask({payload}){
  try {
    const newSubtask = yield call(createSubtaskApi, payload)
    yield put(types.addSubtaskSucceeded(newSubtask))
  } catch (e) {
    yield put(types.addSubtaskFailed(e))
  }
}

function* toggleSubtask({payload}){
  try {
    const subtask = yield call(toggleSubtaskApi, payload)
    yield put(types.toggleSubtaskSucceeded(subtask))
  } catch(e){
    yield put(types.toggleSubtaskFailed({ message: e.message }))
  }
}

function* deleteSubtask({payload}){
  try {
    const removedSubtaskId = yield call(deleteSubtaskApi, payload)
    yield put(types.deleteSubtaskSucceeded(removedSubtaskId))
  } catch (e) {
    yield put(types.deleteSubtaskFailed(e))
  }
}

function* onToggleSubtask(){
  yield takeLatest(types.SUBTASK_TOGGLE_REQUESTED, toggleSubtask)
}

function* onAddSubtask(){
  yield takeLatest(types.SUBTASK_ADD_REQUESTED, addSubtask)
}

function* onDeleteSubtask(){
  yield takeLatest(types.SUBTASK_DELETE_REQUESTED, deleteSubtask)
}

export default function* rootSubtaskSaga() {
  yield all([
    fork(onToggleSubtask),
    fork(onAddSubtask),
    fork(onDeleteSubtask)
  ])
}
