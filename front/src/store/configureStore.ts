import { applyMiddleware, createStore, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AllReduxActions, RootState } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk as ThunkMiddleware<RootState, AllReduxActions>];


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;