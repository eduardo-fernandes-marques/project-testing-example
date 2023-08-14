import { renderWithContext, screen } from '@tests/custom-testing-library';

import { Content } from './Content';

describe('Content', () => {
  it('should render component', () => {
    renderWithContext(
      <Content>
        <p>content</p>
      </Content>
    );

    expect(screen.getByText(/content/)).toBeInTheDocument();
  });
});
