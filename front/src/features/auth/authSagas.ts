import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import actions, { AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST } from "./authActions";
import { AuthApi, AuthDataType } from "./authApi";
import { handleRequest } from "../../utils/saga";
import { ERROR_AUTH_SET } from "../error/errorActions";

export function* watchAuthSagas() {
  yield all([fork(loginWatchSaga), fork(registerWatchSaga)]);
}

function* loginWatchSaga() {
  yield takeEvery(AUTH_LOGIN_REQUEST, loginWorkerSaga);
}

function* loginWorkerSaga(action: ReturnType<typeof actions.loginRequest>) {
  try{
    const response: AuthDataType = yield call
    (handleRequest<typeof AuthApi.login>, AuthApi.login, ERROR_AUTH_SET, action.payload.email, action.payload.password);
    localStorage.setItem('token', response.token);
    yield put(actions.loginSuccess(response.token));
  }
  catch (error) {
    console.log('error')
  }
}


function* registerWatchSaga() {
  yield takeEvery(AUTH_REGISTER_REQUEST, registerWorkerSaga);
}
function* registerWorkerSaga(action: ReturnType<typeof actions.registerRequest>) {
  try{
    console.log('action', action)
    const response: AuthDataType = yield call
    (handleRequest<typeof AuthApi.reg>, AuthApi.reg, ERROR_AUTH_SET, action.payload.name, action.payload.email, action.payload.password, action.payload.phone, action.payload.role);
    yield put(actions.registerSuccess(response.token));
  }
  catch (error) {
    console.log('error')
  }
} 