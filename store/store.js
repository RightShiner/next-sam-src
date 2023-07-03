import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { ProjectReducer } from './reducers/ProjectReducer'

export const initialState = {
  Projects: [],
  loading: false
  // Project: ''
}

export const initStore = (initialState = initialState) => {
  return createStore(ProjectReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
