import * as types from '../constants/actionTypes'
import helpers from '../../data/helpers';

const initialState = {
  rawdata: [],
  averages: {},
  count: {}
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DATA:
      const data = action.payload;
      const clone = {...state};

      // UPDATE RAW DATA ARRAY
      clone.rawdata.push(data);

      // UPDATE AVERAGES + COUNT
      for (let key in data) {
        if (clone.averages[key]) {
          let sum = clone.averages[key] * clone.count[key];
          sum += data[key];
          clone.averages[key] = sum / (clone.count[key] + 1);
        } else clone.averages[key] = data[key];

        if (clone.count[key]) clone.count[key]++;
        else clone.count[key] = 1;
      }

      return clone;

    case types.DELETE_DATA:
      return initialState;
    
    default:
      return state;
  }
};

export default dataReducer;