// __test__/helpers/renderWithRouter.tsx
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultInitialState } from '../../src/store/configureStore';
import { rootReducer, RootState } from '../../src/store/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const renderWithReduxAndRouter = (component: ReactElement, initialRoute: string = '/',initialState: RootState = defaultInitialState) => {
    const store = createStore(rootReducer, initialState);
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                {component}
            </MemoryRouter>
        </Provider>
    );
};
export default renderWithReduxAndRouter;