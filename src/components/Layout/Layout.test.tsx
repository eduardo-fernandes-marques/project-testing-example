import { renderWithContext, screen } from '@tests/custom-testing-library';

import * as stepContext from '@contexts/step';

import { useStepContextMock } from '@mocks/useStepContext.mock';

import { Layout } from './Layout';

const mockUseStepContext = jest.spyOn(stepContext, 'useStepContext');

describe('Layout', () => {
  beforeEach(() => {
    mockUseStepContext.mockReturnValue(useStepContextMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render component', () => {
    renderWithContext(
      <Layout>
        <p>Layout</p>
      </Layout>,
      { withoutLayout: true }
    );

    expect(screen.getByText(/layout/i)).toBeInTheDocument();
    expect(screen.getByText(/fake title/i)).toBeInTheDocument();
    expect(screen.getByText(/fake description/i)).toBeInTheDocument();
  });

  it('should not render Header/Content when "mount" is "false"', () => {
    renderWithContext(
      <Layout mount={false}>
        <p>Layout</p>
      </Layout>,
      { withoutLayout: true }
    );

    expect(screen.getByText(/layout/i)).toBeInTheDocument();
    expect(screen.queryByText(/fake title/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/fake description/i)).not.toBeInTheDocument();
  });
});
