import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import actions, { USER_SET_COURESES_REQUEST, USER_SET_REQUEST } from "./userActions";
import { handleRequest } from "../../utils/saga";
import { UserApi } from "./userApi";
import { ERROR_USER_SET } from "../error/errorActions";
import { UserType } from "./userReducer";

export function* watchUserSagas() {
  yield all([fork(setUserWatchSaga)]);
}

function* setUserWatchSaga() {
  yield takeEvery(USER_SET_REQUEST, setUserWorkerSaga);
}
function* setUserWorkerSaga(action: ReturnType<typeof actions.setUserRequest>) {
  try {
    const response: UserType = yield call(handleRequest<typeof UserApi.get>, UserApi.get, ERROR_USER_SET);
    yield put(actions.setUserSuccess(response));
  }
  catch (error) {
    console.log('WTF BLAT')
  }
}