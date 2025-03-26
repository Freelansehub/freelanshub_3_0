
import {
    UserActionsType 
} from "./userActions";

export type UserInitialStateType = {
    isFatcing: boolean
};

const initialState = {
    isFatcing: false
};

export default function userReducer(
    state: UserInitialStateType = initialState, 
    action: UserActionsType): 
    UserInitialStateType {
    switch (action.type) {
        
        default:
            return state;

    }
}
