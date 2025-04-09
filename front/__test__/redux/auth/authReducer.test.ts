import authActions from "../../../src/features/auth/authActions";
import authReducer, { authInitialState } from "../../../src/features/auth/authReducer";
import { RoleType } from "../../../src/features/user/userReducer";


describe("authReducer", () => {
    let initialState = {...authInitialState};
    beforeEach(() => {
        initialState = {...authInitialState};
    });
    
    it("should handle AUTH_LOGIN_REQUEST", () => {
        const action = authActions.loginRequest('email', 'password');
        const expectedState = { ...initialState, isLoading: true };
        expect(authReducer(authInitialState, action)).toEqual(expectedState);
    });
    
    it("should handle AUTH_LOGIN_SUCCESS", () => {
        const action = authActions.loginSuccess("token123");
        const expectedState = { ...initialState, isAuth: true, token: "token123" };
        expect(authReducer(authInitialState, action)).toEqual(expectedState);
    });
    
    it("should handle AUTH_REGISTER_REQUEST", () => {
        const action = authActions.registerRequest("name", "email", "password", "phone", RoleType.client);
        const expectedState = { ...initialState, isLoading: true };
        expect(authReducer(authInitialState, action)).toEqual(expectedState);
    });
    
    it("should handle AUTH_REGISTER_SUCCESS", () => {
        const action = authActions.registerSuccess("token123");
        const expectedState = { ...initialState, isAuth: true, token: "token123" };
        expect(authReducer(authInitialState, action)).toEqual(expectedState);
    });
    }
);
