import { applyMiddleware, createStore, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AllReduxActions, RootState } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk as ThunkMiddleware<RootState, AllReduxActions>];

export const defaultInitialState: RootState = {
  auth: { 
    token:"", 
    isAuth: false, 
    isLoading: false 
  },
  user : { 
    user: null, 
    isFatcing: false 
  },
  error:{
    errorAuth: [],
    errorUser: [],
    errorCours: [],
    errorHomework: [],
}
  // Пример для других редьюсеров
};

const store = createStore(
  rootReducer,
  defaultInitialState,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;