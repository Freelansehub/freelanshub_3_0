import { ReducerActionsType } from "../../redux/rootReducer";
import { RoleType } from "../user/userReducer";

export const AUTH_LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST' as const;
export const AUTH_LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS' as const;

export const AUTH_LOGOUT = 'AUTH/LOGOUT' as const;

export const AUTH_REGISTER_REQUEST = 'AUTH/REGISTER_REQUEST' as const;
export const AUTH_REGISTER_SUCCESS = 'AUTH/REGISTER_SUCCESS' as const;

const authActions = {
    loginRequest: (data:{
        email: string, 
        password: string,
    }) => ({ type: AUTH_LOGIN_REQUEST, payload:{...data } }),
    loginSuccess: (token: string) => ({ type: AUTH_LOGIN_SUCCESS, token }),

    registerRequest: (data:{
        name:string,
        email: string,
        password: string, 
        phone:string,
        role:RoleType 
    }  ) => 
        ({ type: AUTH_REGISTER_REQUEST, payload:{...data }}),
    registerSuccess: (token: string) => 
        ({ type: AUTH_REGISTER_SUCCESS, token}),
    
    logout: () => ({ type: AUTH_LOGOUT }),
};

export default authActions;

export type AuthActionCreatorsType = typeof authActions;

export type AuthActionsType = ReducerActionsType<AuthActionCreatorsType>;