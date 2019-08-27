import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import session from './session'
import archiveId from './archiveId'
import archivedVideo from './archivedVideo'
import questionReducer from './questionStore'
import userVideo from './userVideos'
import faceData from './faceData'

const reducer = combineReducers({
  user,
  session,
  archiveId,
  archivedVideo,
  questionReducer,
  userVideo,
  faceData
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
