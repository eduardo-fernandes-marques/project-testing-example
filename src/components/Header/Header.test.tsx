import { renderWithContext, screen } from '@tests/custom-testing-library';

import { Header } from './Header';

jest.doMock('@hooks/useStep');

describe('Header', () => {
  it('should render component', async () => {
    renderWithContext(<Header />, { withoutLayout: true });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText(/logo de teste/)).toBeInTheDocument();

    expect(screen.getByTitle(/etapa 1/i)).toBeInTheDocument();
    expect(screen.getByTitle(/etapa 4/i)).toBeInTheDocument();
  });
});
