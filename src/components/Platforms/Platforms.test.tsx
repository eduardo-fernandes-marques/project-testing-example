import { renderWithTheme, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import type { Props as FormProps } from '@components/forms';

import { Platforms } from '.';

import type { PlatformsProps } from '.';
import type { Control } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

const onChange = jest.fn();

const props: PlatformsProps = {
  control: {} as Control<FormProps, unknown>,
  name: 'store.platform.name',
  onChange,
  payload: [
    {
      label: 'nuvem shop',
      value: 'nuvemShop',
    },
    {
      label: 'dooca',
      value: 'dooca',
    },
    {
      label: 'loja integrada',
      value: 'lojaIntegrada',
    },
    {
      label: 'magento',
      value: 'magento',
    },
    {
      label: 'vtex',
      value: 'vtex',
    },
    {
      label: 'shopify',
      value: 'shopify',
    },
    {
      label: 'tray',
      value: 'tray',
    },
    {
      label: 'wix',
      value: 'wix',
    },
    {
      label: 'woo',
      value: 'woo',
    },
    {
      label: 'outra',
      value: 'other',
    },
  ],
};

describe('platforms', () => {
  it('should render component', async () => {
    renderWithTheme(<Platforms {...props} />);

    expect(screen.getAllByRole('radio').length).toBe(10);
  });

  it('should handle change', async () => {
    renderWithTheme(<Platforms {...props} />);

    const radio = screen.getByLabelText(/vtex/i);

    userEvent.click(radio);

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
