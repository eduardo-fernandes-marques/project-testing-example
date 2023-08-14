import { renderWithTheme, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import type { Props } from '@hooks/useControl';

import type { Props as FormProps } from '@components/forms';

import { Checkbox } from '.';

import type { Control } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

const commonProps: Props = {
  onChange: jest.fn(),
  control: {} as Control<FormProps, unknown>,
  name: 'name',
  label: 'name',
  value: 'name',
};

describe('radio', () => {
  it('should render component', async () => {
    renderWithTheme(<Checkbox {...commonProps} />);

    expect(screen.getByRole('checkbox', { name: /name/i })).toBeInTheDocument();
  });

  it('should handle change', async () => {
    const onChange = jest.fn();
    renderWithTheme(<Checkbox {...commonProps} onChange={onChange} />);

    await waitFor(() => userEvent.click(screen.getByRole('checkbox')));

    expect(onChange).toHaveBeenCalled();
  });
});
