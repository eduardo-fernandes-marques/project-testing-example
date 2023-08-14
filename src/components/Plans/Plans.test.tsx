import { renderWithTheme, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import type { Props as FormProps } from '@components/forms';

import { Plans } from '.';

import type { PlansProps } from '.';
import type { Control } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

const onChange = jest.fn();

const props: PlansProps = {
  control: {} as Control<FormProps, unknown>,
  name: 'plan',
  onChange,
  payload: [
    {
      label: 'Starter',
      value: 'starter',
      detail: '7 dias grátis',
      options: [
        { checked: true, title: 'Lorem ipsun starter' },
        { checked: false, title: 'Lorem ipsun starter 2' },
        { checked: false, title: 'Lorem ipsun starter 3' },
      ],
    },
    {
      label: 'Scale',
      value: 'scale',
      detail: 'Consultar',
      options: [
        { checked: true, title: 'Lorem ipsun scale' },
        { checked: true, title: 'Lorem ipsun scale 2' },
        { checked: false, title: 'Lorem ipsun scale 3' },
      ],
    },
    {
      label: 'Premium',
      value: 'premium',
      detail: 'Consultar',
      options: [
        { checked: true, title: 'Lorem ipsun premium' },
        { checked: true, title: 'Lorem ipsun premium 2' },
        { checked: true, title: 'Lorem ipsun premium 3' },
      ],
    },
  ],
};

describe('plans', () => {
  it('should render component', async () => {
    renderWithTheme(<Plans {...props} />);

    expect(screen.getAllByRole('radio').length).toBe(3);
  });

  it('should handle change', async () => {
    renderWithTheme(<Plans {...props} />);

    const radio = screen.getByLabelText(/Lorem ipsun scale 3/i);

    userEvent.click(radio);

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
