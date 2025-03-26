import { ReducerActionsType } from "../../store/rootReducer";
const SET_USER = "USER/SET_USER" as const;

const userActions = {
    setUser: () => ({type: SET_USER})
}

export default userActions;

export type UserActionCreatorsType = typeof userActions;

export type UserActionsType = ReducerActionsType<UserActionCreatorsType>