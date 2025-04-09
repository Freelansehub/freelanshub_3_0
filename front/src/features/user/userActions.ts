import { ReducerActionsType } from "../../store/rootReducer";
import { UserType } from "./userReducer";

export const USER_SET_REQUEST = 'USER/SET_REQUEST' as const;
export const USER_SET_SUCCESS = 'USER/SET_SUCCESS' as const;

export const USER_UNSET = 'USER/UNSET' as const;

export const USER_SET_COURESES_REQUEST = 'USER/SET_COURESES_REQUEST' as const;
export const USER_SET_COURESES_SUCCESS = 'USER/SET_COURESES_SUCCESS' as const;

const userActions = {
    setUserRequest: () => ({ type: USER_SET_REQUEST }),
    setUserSuccess: (user: UserType) => ({ type: USER_SET_SUCCESS, user }),

    unsetUser: () => ({ type: USER_UNSET }),
}

export default userActions;

export type UserActionCreatorsType = typeof userActions;

export type UserActionsType = ReducerActionsType<UserActionCreatorsType>