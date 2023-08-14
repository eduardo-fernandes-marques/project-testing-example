import { renderWithContext, screen, userEvent, waitFor } from '@tests/custom-testing-library';
import { resources } from '@tests/fixtures.json';

import { ERROR } from '@utils/validations';

import { Template } from './Template';

import type { Props } from '.';

const onSubmit = jest.fn();

const { templates } = resources;

const props: Props = {
  templates,
  onSubmit,
};

describe('Template', () => {
  it('should render component', () => {
    renderWithContext(<Template {...props} />);

    expect(screen.getByRole('button', { name: /avançar/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /basictemplate/i })).toBeInTheDocument();
    expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<Template {...props} />);

    userEvent.click(screen.getByRole('button', { name: /avançar/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle submit error', async () => {
    renderWithContext(<Template {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />);
    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
