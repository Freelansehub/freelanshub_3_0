
import { 
    ERROR_FIGUR_SET, 
    ErrorActionsType 
} from "./errorActions";

export type ErrorInitialStateType = {
    errorFigur: string[]
};

const initialState = {
    errorFigur: [],
};

export default function errorReducer(state: ErrorInitialStateType = initialState, action: ErrorActionsType): ErrorInitialStateType {
    switch (action.type) {
        case ERROR_FIGUR_SET:
            return {
                ...state,
                errorFigur:  [...state.errorFigur, ...action.errors]
            }
        default:
            return state;

    }
}
