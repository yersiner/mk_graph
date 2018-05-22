import { SET_USER, SET_TOKEN, UPDATE_LOADING_STATUS, UPDATE_SUCCESS_STATUS,UPDATE_LEFT_LOADING_STATUS } from './mutation_types.js'

export default {
  UPDATE_LOADING_STATUS (state, payload) {
    state.loading = payload.isLoading
  },
  UPDATE_LEFT_LOADING_STATUS (state, payload) {
    state.left_loading = payload.isLoading
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  UPDATE_SUCCESS_STATUS(state, status) {
  	state.isSuccess = status
  },
  [SET_TOKEN] (state, token) {
    state.token = token
    window.localStorage.setItem('token', token)
  }
}
