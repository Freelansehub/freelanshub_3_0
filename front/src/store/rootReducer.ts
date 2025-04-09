import { combineReducers } from "redux";
import { UserActionsType } from "../features/user/userActions";
import errorReducer, { ErrorInitialStateType } from "../features/error/errorReducer";
import { ErrorActionsType } from "../features/error/errorActions";
import { AuthActionsType } from "../features/auth/authActions";
import userReducer, { UserInitialStateType } from "../features/user/userReducer";
import authReducer, { AuthInitialStateType } from "../features/auth/authReducer";

export type RootState = {
    user: UserInitialStateType;
    auth: AuthInitialStateType;
    error: ErrorInitialStateType;
};

const appReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    error: errorReducer,
});

export const rootReducer = (state: RootState | undefined, action: AllReduxActions) => {
    return appReducer(state, action);
};

export type ReducerActionsType<A extends { [key: string]: (...args: any[]) => any }> = ReturnType<A[keyof A]>;

export type AllReduxActions =  UserActionsType | ErrorActionsType | AuthActionsType;