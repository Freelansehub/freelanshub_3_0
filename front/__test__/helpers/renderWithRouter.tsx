// __test__/helpers/renderWithRouter.tsx
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRouter = (component: ReactElement, initialRoute: string = '/') => {
  
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {component}
    </MemoryRouter>
  );
};
