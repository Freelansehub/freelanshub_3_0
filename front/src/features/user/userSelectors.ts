import { RootState } from "../../store/rootReducer";

export const userSelectors = {
  getUser : (state: RootState) => state.user.user,
  getIsFetching : (state: RootState) => state.user.isFatcing,
}