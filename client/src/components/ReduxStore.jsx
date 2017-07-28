import { applyMiddleware, combineReducers, createStore } from 'redux';

// middleware for logger
const logger = (store) => (next) => (action) => {
  console.log('ACTION FIRED', action);
  next(action);
};

// middleware for error handling
const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log('ERROR', e);
  }
};

const middleWare = applyMiddleware(logger, error);


// f1
const uReducer = function(state = { u1: '', u2: '' }, action ) {
  // configure Bable compile ES7 spread operator
  // const newState = {...state};
  let newState = Object.assign({}, state);
  return newState;
};

// f2
const pReducer = function (state = { p1: 0, p2: 0 }, action) {
  let newState = Object.assign({}, state);
  if (action.type === 'test') {

  }
  return newState;
};


// f3
const reducers = combineReducers({
  u: uReducer,
  p: pReducer
});

// default state?
const store = createStore(reducers, {}, middleWare);



store.subscribe(()=>{
  console.log('STORE CHANGED', store.getState());
});

store.dispatch({type: 'test', payload: '1'});