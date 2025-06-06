import { createStore } from "redux";
import { defaultInitialState } from "../../src/redux/configureStore";
import { rootReducer, RootState } from "../../src/redux/rootReducer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

export const renderWithRedux = (component: React.ReactElement, initialState: RootState = defaultInitialState ) => {

    const store = createStore(rootReducer, initialState);

    return render(
        <Provider store={store}>
            {component}
        </Provider>
    )
}