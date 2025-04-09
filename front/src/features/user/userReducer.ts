
import {
    USER_SET_COURESES_REQUEST, USER_SET_COURESES_SUCCESS, 
    USER_SET_REQUEST, USER_SET_SUCCESS, USER_UNSET, 
    UserActionsType 
} from "./userActions";

export enum RoleType {
    admin = 'admin',
    frelanser = 'frelanser',
    client = 'client'
};

export type UserType = {
    id: string;
    name: string;
    email: string; 
    phone?: number;
    role: RoleType;
};

export type UserInitialStateType = {
    user: UserType | null,
    isFatcing: boolean
};

const initialState = {
    user: null,
    isFatcing: false,
};

export default function userReducer(state: UserInitialStateType = initialState, action: UserActionsType): UserInitialStateType {
    switch (action.type) {
        case USER_SET_REQUEST:
            return {
                ...state,
                isFatcing: true
            }
        case USER_SET_SUCCESS:
            return{
                ...state,
                isFatcing: false,
                user: action.user
            }

        case USER_UNSET:
            return{
                ...state,
                user: null,
                isFatcing: false,
            }
        

        default:
            return state;

    }
}
