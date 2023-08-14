import { renderWithContext, screen } from '@tests/custom-testing-library';

import { Stepper } from './Stepper';

jest.doMock('@hooks/useStep');

describe('Stepper', () => {
  it('should render component', () => {
    renderWithContext(<Stepper />, { withoutLayout: true });

    expect(screen.getByTitle(/etapa 1/i)).toBeInTheDocument();
    expect(screen.getByTitle(/etapa 2/i)).toBeInTheDocument();
  });
});
