import * as types from '../constants/actionTypes'

export const updateDataActionCreator = newData => ({
  type: types.UPDATE_DATA,
  payload: newData
})

export const deleteDataActionCreator = () => ({
  type: types.DELETE_DATA
})