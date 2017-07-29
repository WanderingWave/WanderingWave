import reducer from "./reducers";
import { createStore, applyMiddleware } from 'redux';

const logger = (store) => (next) => (action) => {
  console.log('ACTION FIRED', action);
  next(action);
};

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log('ERROR', e);
  }
};

const middleWare = applyMiddleware(logger, error);

console.log('Redux: middleware setup | store created')
// looks like second parameter should be {}
// const store = createStore(reducers, {}, middleWare);
export default createStore(reducer, middleWare)
