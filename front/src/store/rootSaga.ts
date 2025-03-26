import { all, fork } from 'redux-saga/effects';
import { watchUserSagas } from '../features/user/userSagas';
import { watchErrorSagas } from '../features/error/errorSagas';

export default function* rootSaga() {
  yield all([
    fork(watchUserSagas),
    fork(watchErrorSagas),
  ])
}