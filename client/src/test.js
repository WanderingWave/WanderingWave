import store from "./store"

store.subscribe(()=>{
  console.log('STORE CHANGED', store.getState());
});

store.dispatch({type: 'test', payload: '1'});

// console.log('test');