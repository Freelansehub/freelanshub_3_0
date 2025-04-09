import { all, fork } from 'redux-saga/effects';
import { watchUserSagas } from '../features/user/userSagas';
import { watchErrorSagas } from '../features/error/errorSagas';
import { watchAuthSagas } from '../features/auth/authSagas';

export default function* rootSaga() {
  yield all([
    fork(watchUserSagas),
    fork(watchAuthSagas),
    fork(watchErrorSagas),
  ])
}