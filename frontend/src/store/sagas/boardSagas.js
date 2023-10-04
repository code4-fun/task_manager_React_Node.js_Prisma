import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/boardActions'
import {fetchBoardsApi} from "../../api/boards"

function* fetchBoards({payload}){
  try {
    const boards = yield call(fetchBoardsApi, payload)
    yield put(types.fetchBoardsSucceeded({data: boards}))
  } catch(e){
    yield put(types.fetchBoardsFailed({ message: e.message }))
  }
}

function* onFetchBoards(){
  yield takeLatest(types.BOARDS_FETCH_REQUESTED, fetchBoards)
}


export default function* rootBoardSaga() {
  yield all([
    fork(onFetchBoards)
  ])
}
