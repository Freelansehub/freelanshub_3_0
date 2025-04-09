import { AUTH_LOGIN_SUCCESS, AUTH_REGISTER_SUCCESS, AuthActionsType, AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST } from "./authActions";

export type AuthType = string | null;

export type AuthInitialStateType = {
  token: AuthType;
  isAuth: boolean;
  isLoading: boolean;
};

export const authInitialState = {
  token: null,
  isAuth: false,
  isLoading: false,
};

export default function authReducer(
  state: AuthInitialStateType = authInitialState,
  action: AuthActionsType
): AuthInitialStateType {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, isAuth: true, isLoading: false, token: action.token };

    case AUTH_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case AUTH_REGISTER_SUCCESS:
      return { ...state, isAuth: true, isLoading: false, token: action.token };

    default:
      return state;
  }
}
