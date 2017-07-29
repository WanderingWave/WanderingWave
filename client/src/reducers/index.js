import {combineReducers} from "redux";

const uReducer = function(state = { u1: '', u2: '' }, action ) {
  // const newState = {...state};
  let newState = Object.assign({}, state);
  return newState;
};

const pReducer = function (state = { p1: 0, p2: 0 }, action) {
  // const newState = {...state};
  let newState = Object.assign({}, state);
  if (action.type === 'test') {

  }
  return newState;
};

// console.log('Redux: reducers setup')
export default combineReducers({
  u: uReducer,
  p: pReducer
});
