import * as types from '../types'
import axios from 'axios'
import {config, removeAlert, api, setAuthToken} from '../../utils'
import {getToken} from '../storage'

// Login
export const login = (username, password) => async (dispatch) => {
  const body = {username, password}

  try {
    dispatch({type: types.LOADING_USER})
    const {data} = await axios.post(`${api}/users/loginUser`, body, config)
    dispatch({type: types.LOGIN, payload: data})
    getToken()
      .then((token) => setAuthToken(token))
      .then(() => dispatch(getCurrentUser()))
  } catch (error) {
    dispatch({type: types.LOGIN_ERROR, payload: error.response.data})
    removeAlert(dispatch)
  }
}

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({type: types.LOADING_USER})
    const res = await axios.get(`${api}/users`)
    dispatch({type: types.GET_USERS, payload: res.data})
  } catch (error) {
    dispatch({type: types.GET_USERS_ERROR})
  }
}

// Get current user
export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({type: types.LOADING_USER})
    const {data} = await axios.get(`${api}/users/me`)
    dispatch({type: types.GET_CURRENT_USER, payload: data})
  } catch (error) {
    dispatch({type: types.GET_CURRENT_USER_ERROR, payload: error.response.data})
    removeAlert(dispatch)
  }
}

// Logout
export const logout = () => async (dispatch) => {
  dispatch({type: types.LOGOUT})
}

// Get voted users
export const getVotedUsers = () => async (dispatch) => {
  try {
    dispatch({type: types.LOADING_USER})
    const res = await axios.get(`${api}/users?isVoted=true`)
    dispatch({type: types.GET_VOTED_USERS, payload: res.data})
  } catch (error) {
    dispatch({type: types.GET_VOTED_USERS_ERROR})
  }
}

// Get unvoted users
export const getUnVotedUsers = () => async (dispatch) => {
  try {
    dispatch({type: types.LOADING_USER})
    const res = await axios.get(`${api}/users?isVoted=false`)
    dispatch({type: types.GET_UNVOTED_USERS, payload: res.data})
  } catch (error) {
    dispatch({type: types.GET_UNVOTED_USERS_ERROR})
  }
}
