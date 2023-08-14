import axios from 'axios';

import { renderWithContext, screen, userEvent, waitFor } from '@tests/custom-testing-library';
import { resources } from '@tests/fixtures.json';

import { Lead } from '@models/lead';

import { ERROR } from '@utils/validations';

import { Plan } from '.';

import type { Props } from '.';

const axiosSpy = jest.spyOn(axios, 'post');

const onSubmit = jest.fn();

const { plans } = resources;

const props: Props = {
  plans,
  onSubmit,
};

describe('plan', () => {
  it('should render component', async () => {
    renderWithContext(<Plan {...props} />);

    await waitFor(() => expect(screen.getAllByRole('radio').length).toBe(3));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument()
    );
  });

  it('should handle submit', async () => {
    renderWithContext(<Plan {...props} />);

    const radio = screen.getByLabelText(/Scale/i);
    const acceptedTerms = screen.getByLabelText(/Aceito os/i);

    userEvent.click(radio);
    userEvent.click(acceptedTerms);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle form error', async () => {
    renderWithContext(<Plan {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() =>
      expect(screen.getByLabelText('error-plan')).toHaveTextContent(ERROR.REQUIRED)
    );
  });

  it('should handle contract error', async () => {
    renderWithContext(<Plan {...props} />);

    const radio = screen.getByLabelText(/Scale/i);

    userEvent.click(radio);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() =>
      expect(screen.getByLabelText('error-checkbox-acceptedTerms')).toHaveTextContent(
        ERROR.REQUIRED
      )
    );
  });

  it('should handle submit error', async () => {
    renderWithContext(<Plan {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />);

    const radio = screen.getByLabelText(/Scale/i);
    const acceptedTerms = screen.getByLabelText(/Aceito os/i);

    userEvent.click(radio);
    userEvent.click(acceptedTerms);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.getByLabelText('error-plan')).toHaveTextContent(ERROR.FORM));
  });

  it('should handle submit with update', async () => {
    renderWithContext(<Plan {...props} />, { providersConfig: { id: 'lead' } as Partial<Lead> });

    const radio = screen.getByLabelText(/Scale/i);
    const acceptedTerms = screen.getByLabelText(/Aceito os/i);

    userEvent.click(radio);
    userEvent.click(acceptedTerms);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    await waitFor(() => expect(axiosSpy).toHaveBeenCalledTimes(1));
  });
});
