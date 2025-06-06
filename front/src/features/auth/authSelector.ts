import { RootState } from "../../redux/rootReducer";

export const authSelectors = {
    getIsAuth: (state: RootState) => state.auth.isAuth,
    getIsLoading: (state: RootState) => state.auth.isLoading,
    getToken: (state: RootState) => state.auth.token,
}
