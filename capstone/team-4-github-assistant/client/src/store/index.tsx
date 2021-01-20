import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import slackSaga from './sagas/slackSaga';
import reducers from './reducers';
const sagaMiddleware = createSagaMiddleware();
const composeArgs = [ applyMiddleware(sagaMiddleware) ];
const store = createStore(reducers, compose.apply(undefined, composeArgs));
sagaMiddleware.run(slackSaga);

export default store;
