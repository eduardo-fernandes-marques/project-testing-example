import {
  renderWithContext,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@tests/custom-testing-library';

import { Contract } from './Contract';

import type { Props } from './Contract';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

const props: Props = {
  name: 'acceptedTerms',
  defaultValue: true,
};

describe('Contract', () => {
  it('should render component', async () => {
    renderWithContext(<Contract {...props} />);

    expect(screen.getByText(/aceito os/i)).toBeInTheDocument();
    expect(screen.getByText(/termos do contrato/i)).toBeInTheDocument();
  });

  it('should render modal', async () => {
    renderWithContext(<Contract {...props} />);

    const acceptedTerms = screen.getByText(/termos do contrato/i);

    userEvent.click(acceptedTerms);
    waitForElementToBeRemoved(() => acceptedTerms);

    await waitFor(() => expect(screen.getByText(/informações de contrato/i)).toBeInTheDocument());
  });

  it('should close contract modal when clicked on "close" button', async () => {
    renderWithContext(<Contract {...props} />);

    const acceptedTerms = screen.getByText(/termos do contrato/i);

    userEvent.click(acceptedTerms);
    waitForElementToBeRemoved(() => acceptedTerms);

    await waitFor(() => expect(screen.getByText(/informações de contrato/i)).toBeInTheDocument());

    userEvent.click(screen.getAllByRole('button', { name: /fechar/i })[0]);

    waitForElementToBeRemoved(() => screen.getByText(/informações de contrato/i));
    expect(screen.getByText(/termos do contrato/i)).toBeInTheDocument();
  });
});
