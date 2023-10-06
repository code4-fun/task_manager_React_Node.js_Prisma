import {combineReducers, createStore, applyMiddleware} from "redux"
import {modalReducer} from "./reducers/modalReducer"
import {projectReducer} from "./reducers/projectReducer"
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import {all, call, spawn} from "redux-saga/effects"
import rootProjectSaga from "./sagas/projectSagas"
import {boardReducer} from "./reducers/boardReducer"
import rootBoardSaga from "./sagas/boardSagas"
import {taskReducer} from "./reducers/taskReducer"
import rootTaskSaga from "./sagas/taskSagas"
import rootCommentSaga from "./sagas/commentSagas"
import {commentReducer} from "./reducers/commentReducer"
import rootSubtaskSaga from "./sagas/subtaskSagas"
import {authReducer} from "./reducers/authReducer"
import rootFileSaga from "./sagas/fileSagas";

export const rootReducer = combineReducers({
  modal: modalReducer,
  projects: projectReducer,
  boards: boardReducer,
  tasks: taskReducer,
  comments: commentReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

export function* rootSaga(){
  const sagas = [
    rootProjectSaga,
    rootBoardSaga,
    rootTaskSaga,
    rootCommentSaga,
    rootSubtaskSaga,
    rootFileSaga
  ]

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* (){
      while(true){
        try{
          yield call(saga)
          break
        } catch(e){
          console.log(e)
        }
      }
    })
  })

  yield all(retrySagas)
}

sagaMiddleware.run(rootSaga)

export default store
