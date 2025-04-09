
import { 
    ERROR_AUTH_SET, 
    ERROR_USER_SET, 
    ErrorActionsType 
} from "./errorActions";

export type ErrorInitialStateType = {
    errorAuth: string[]
    errorUser: string[]
    errorCours: string[]
    errorHomework: string[]
};

const initialState = {
    errorAuth: [],
    errorUser: [],
    errorCours: [],
    errorHomework: [],
};

export default function errorReducer(state: ErrorInitialStateType = initialState, action: ErrorActionsType): ErrorInitialStateType {
    switch (action.type) {
        case ERROR_AUTH_SET:
            return {
                ...state,
                errorAuth: [...state.errorAuth, ...action.errors]
            }
        case ERROR_USER_SET:
            return {
                ...state,
                errorUser:  [...state.errorUser, ...action.errors]
            }
        default:
            return state;

    }
}
