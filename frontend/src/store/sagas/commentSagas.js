import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/commentActions'
import {createComment, updateComment, deleteComment, fetchCommentsApi} from '../../api/comments'

function* fetchComments({payload}) {
  try {
    const comments = yield call(fetchCommentsApi, payload)
    yield put(types.fetchCommentsSucceeded({data: comments}))
  } catch (e) {
    yield put(types.fetchCommentsFailed({ message: e.message }))
  }
}

function* addComment({payload}){
  try {
    const comment = yield call(createComment, payload)
    yield put(types.addCommentSucceeded(comment))
  } catch (e) {
    yield put(types.addCommentFailed(e))
  }
}

function* editComment({payload}){
  try {
    const comment = yield call(updateComment, payload)
    yield put(types.editCommentSucceeded(comment))
  } catch (e) {
    yield put(types.editCommentFailed(e))
  }
}

function* removeComment({payload}){
  try {
    const id = yield call(deleteComment, payload)
    yield put(types.deleteCommentSucceeded(id))
  } catch (e) {
    yield put(types.deleteCommentFailed(e))
  }
}

function* onFetchComments() {
  yield takeLatest(types.COMMENTS_FETCH_REQUESTED, fetchComments)
}

function* onAddComment() {
  yield takeLatest(types.COMMENT_ADD_REQUESTED, addComment)
}

function* onEditComment() {
  yield takeLatest(types.COMMENT_EDIT_REQUESTED, editComment)
}

function* onDeleteComment(){
  yield takeLatest(types.COMMENT_DELETE_REQUESTED, removeComment)
}

export default function* rootCommentSaga() {
  yield all([
    fork(onFetchComments),
    fork(onAddComment),
    fork(onEditComment),
    fork(onDeleteComment)
  ])
}
