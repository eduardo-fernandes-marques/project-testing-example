import { renderWithTheme, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import type { Props } from '@hooks/useControl';

import type { Props as FormProps } from '@components/forms';

import { Select } from '.';

import type { SelectProps } from '.';
import type { Control } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

const commonProps: Props & SelectProps = {
  onChange: jest.fn(),
  control: {} as Control<FormProps, unknown>,
  name: 'name',
  payload: [{ label: 'test', value: 'test' }],
};

describe('select', () => {
  it('should render component', async () => {
    renderWithTheme(<Select {...commonProps} />);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('option', { name: /test/ })).toBeInTheDocument());
  });

  it('should handle change', async () => {
    const onChange = jest.fn();
    renderWithTheme(<Select {...commonProps} onChange={onChange} />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'test');

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
