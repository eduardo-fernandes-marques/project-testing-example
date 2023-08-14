import { renderWithContext, screen } from '@tests/custom-testing-library';

import { Jumbotron } from './Jumbotron';

describe('Jumbotron', () => {
  it('should render component', () => {
    renderWithContext(<Jumbotron />, { withoutLayout: true });

    expect(screen.getByAltText(/jumbotron image/i)).toBeInTheDocument();
  });
});
