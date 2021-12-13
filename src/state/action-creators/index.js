import * as types from '../constants/actionTypes'

// create action creators and export them all individually
// "export const [nameOfCreator]""

export const updateDataActionCreator = newData => ({
  type: types.UPDATE_DATA,
  payload: newData
})

export const deleteDataActionCreator = () => ({
  type: types.DELETE_DATA
})

// maybe add some actions for options 
// actions can update how many resolvers to show for each graph

// do we need action for darkmode? or chakra ui provides native method?