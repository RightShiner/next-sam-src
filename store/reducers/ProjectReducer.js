import {
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  LOADING
}
from '../actions/types';
import { initialState } from '../store'

export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return Object.assign({}, state, action.payload)
    case ADD_PROJECT_SUCCESS:
      return Object.assign({}, state, { openProject: false, loading: false})
    case UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state, { openUpdate: false, loading: false})
    case DELETE_PROJECT_SUCCESS:
      return state
    case LOADING:
      return Object.assign({}, state, { loading: true})
    default:
      return initialState
  }
}