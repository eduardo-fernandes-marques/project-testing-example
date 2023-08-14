import { renderWithContext, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import * as leadContext from '@contexts/lead';

import { ERROR } from '@utils/validations';

import { useLeadContextMock } from '@mocks/useLeadContext.mock';

import { BusinessCheckpoint } from '.';

const onSubmit = jest.fn();

const mockUseLeadContext = jest.spyOn(leadContext, 'useLeadContext');

const props = {
  onSubmit,
  segments: [],
  revenues: [],
};

describe('BusinessCheckpoint', () => {
  beforeEach(() => {
    mockUseLeadContext.mockReturnValue(useLeadContextMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render component', async () => {
    renderWithContext(<BusinessCheckpoint {...props} />);

    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
    expect(screen.getByText(/estou começando do zero/i)).toBeInTheDocument();
    expect(screen.getByText(/tenho loja física/i)).toBeInTheDocument();
    expect(screen.getByText(/tenho e-commerce e loja física/i)).toBeInTheDocument();
    expect(screen.getByText('Tenho e-commerce')).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<BusinessCheckpoint {...props} />);

    const [hasECommerce] = screen.getAllByRole('radio');

    userEvent.click(hasECommerce);

    userEvent.click(screen.getByText('Avançar'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle form error', async () => {
    renderWithContext(<BusinessCheckpoint {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getAllByText(ERROR.REQUIRED).length).toBe(4));
  });

  it('should handle submit error', async () => {
    renderWithContext(
      <BusinessCheckpoint {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />
    );

    const [hasECommerce] = screen.getAllByRole('radio');
    userEvent.click(hasECommerce);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
