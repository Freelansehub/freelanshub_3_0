import { ReducerActionsType } from "../../store/rootReducer";

export const ERROR_AUTH_SET = 'ERROR/AUTH_SET' as const;
export const ERROR_USER_SET = 'ERROR/USER_SET' as const;

const actions = {
    setErrorAuth: (errors: string[]) => ({type: ERROR_AUTH_SET, errors}),
    setErrorUser: (errors: string[]) => ({type: ERROR_USER_SET, errors}),
}

export default actions;

export type ErrorActionCreatorsType = typeof actions;

export type ErrorActionsType = ReducerActionsType<ErrorActionCreatorsType>