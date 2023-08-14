import { renderWithContext, screen, userEvent, waitFor } from '@tests/custom-testing-library';
import { resources } from '@tests/fixtures.json';

import { ERROR } from '@utils/validations';

import { Platform } from '.';

import type { Props } from '.';

const onSubmit = jest.fn();

const { platforms } = resources;

const props: Props = {
  platforms,
  onSubmit,
};

describe('platform', () => {
  it('should render component', async () => {
    renderWithContext(<Platform {...props} />);

    expect(screen.getAllByRole('radio').length).toBe(10);
    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<Platform {...props} />);

    const radio = screen.getByLabelText(/vtex/i);

    userEvent.click(radio);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle form error', async () => {
    renderWithContext(<Platform {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getByText(ERROR.REQUIRED)).toBeInTheDocument());
  });

  it('should handle submit error', async () => {
    renderWithContext(<Platform {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />);

    const radio = await waitFor(() => screen.getByLabelText(/vtex/i));

    userEvent.click(radio);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());

    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
