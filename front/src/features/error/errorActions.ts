import { ReducerActionsType } from "../../store/rootReducer";

export const ERROR_FIGUR_SET = 'ERROR/FIGUR_SET' as const;

const actions = {
    setErrorFigur: (errors: string[]) => ({type: ERROR_FIGUR_SET, errors}),
}

export default actions;

export type ErrorActionCreatorsType = typeof actions;

export type ErrorActionsType = ReducerActionsType<ErrorActionCreatorsType>