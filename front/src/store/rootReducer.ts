import { combineReducers } from "redux";
import { UserActionsType } from "../features/user/userActions";
import userReducer, { UserInitialStateType } from "../features/user/userReducer";
import errorReducer, { ErrorInitialStateType } from "../features/error/errorReducer";
import { ErrorActionsType } from "../features/error/errorActions";

export type RootState = {
    user: UserInitialStateType;
    error: ErrorInitialStateType;
};

const appReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
});

export const rootReducer = (state: RootState | undefined, action: AllReduxActions) => {
    return appReducer(state, action);
};

export type ReducerActionsType<A extends { [key: string]: (...args: any[]) => any }> = ReturnType<A[keyof A]>;

export type AllReduxActions =  UserActionsType | ErrorActionsType;