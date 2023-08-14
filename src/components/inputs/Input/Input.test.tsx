/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react';

import { renderWithTheme, userEvent } from '@tests/custom-testing-library';

import { Input } from './Input';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

describe('Input', () => {
  it('should render component', async () => {
    renderWithTheme(
      <Input
        autoComplete="off"
        control={'' as any}
        name="name"
        placeholder="Informe o nome da agência"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText(/Informe o nome da agência/i)).toBeInTheDocument();
  });

  it('should call on change', async () => {
    const onChange = jest.fn();

    renderWithTheme(
      <Input
        autoComplete="off"
        control={'' as any}
        name="name"
        placeholder="Informe o nome da agência"
        onChange={onChange}
      />
    );

    const field = screen.getByPlaceholderText(/Informe o nome da agência/i);

    userEvent.type(field, 'something');

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
