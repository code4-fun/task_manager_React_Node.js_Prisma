import {takeLatest, call, put, fork, all} from 'redux-saga/effects'
import * as types from '../actions/projectActions'
import {createProjectApi, deleteProjectApi, fetchProjectsApi, updateProjectApi} from "../../api/projects"

function* fetchProjects(){
  try {
    const projects = yield call(fetchProjectsApi)
    yield put(types.fetchProjectsSucceeded({data: projects}))
  } catch(e){
    yield put(types.fetchProjectsFailed({ message: e.message }))
  }
}

function* addProject({payload}){
  try {
    const newProject = yield call(createProjectApi, payload)
    yield put(types.addProjectSucceeded(newProject))
  } catch (e) {
    yield put(types.addProjectFailed(e))
  }
}

function* deleteProject({payload}){
  try {
    const id = yield call(deleteProjectApi, payload)
    yield put(types.deleteProjectSucceeded(id))
  } catch (e) {
    yield put(types.deleteProjectFailed(e))
  }
}

function* editProject({payload}){
  try {
    const project = yield call(updateProjectApi, payload)
    yield put(types.editProjectSucceeded(project))
  } catch (e) {
    yield put(types.editProjectFailed(e))
  }
}

function* onFetchProjects(){
  yield takeLatest(types.PROJECTS_FETCH_REQUESTED, fetchProjects)
}

function* onAddProject(){
  yield takeLatest(types.PROJECT_ADD_REQUESTED, addProject)
}

function* onDeleteProject(){
  yield takeLatest(types.PROJECT_DELETE_REQUESTED, deleteProject)
}

function* onEditProject(){
  yield takeLatest(types.PROJECT_EDIT_REQUESTED, editProject)
}

export default function* rootProjectSaga() {
  yield all([
    fork(onFetchProjects),
    fork(onAddProject),
    fork(onDeleteProject),
    fork(onEditProject),
  ])
}
