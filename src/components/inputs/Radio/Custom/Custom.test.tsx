import { renderWithTheme, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import type { Props } from '@hooks/useControl';

import type { Props as FormProps } from '@components/forms';

import { CustomRadio } from '.';

import type { CustomRadioProps } from '.';
import type { Control } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  Control: jest.fn(),
  useController: () => ({ field: { onChange: jest.fn() }, formState: '' }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ label, src }: { label: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={label} src={src} />;
  },
}));

const commonProps: Props & CustomRadioProps = {
  onChange: jest.fn(),
  control: {} as Control<FormProps, unknown>,
  name: 'name',
  label: 'name',
  value: 'name',
};

describe('custom radio', () => {
  it('should render component', async () => {
    renderWithTheme(<CustomRadio {...commonProps} />);

    expect(screen.getByRole('radio', { name: /name/i })).toBeInTheDocument();
  });

  it('should handle change', async () => {
    const onChange = jest.fn();

    renderWithTheme(<CustomRadio {...commonProps} onChange={onChange} />);

    userEvent.click(screen.getByRole('radio'));

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });

  it('should handle image src', async () => {
    const onChange = jest.fn();

    renderWithTheme(<CustomRadio {...commonProps} onChange={onChange} />);

    userEvent.click(screen.getByRole('radio'));

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });

  it('should handle without image', async () => {
    const onChange = jest.fn();

    renderWithTheme(
      <CustomRadio
        {...commonProps}
        options={[
          { title: 'test', checked: false },
          { title: 'test 2', checked: true },
        ]}
        onChange={onChange}
      />
    );

    expect(screen.getAllByText(/test/i).length).toBe(2);

    userEvent.click(screen.getByRole('radio', { name: /name/i }));

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });
});
