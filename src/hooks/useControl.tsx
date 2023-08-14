import React from 'react';

import { get } from 'lodash';
import { useController } from 'react-hook-form';

import type { Props as FormProps } from '@components/forms';

import type { UseControllerProps } from 'react-hook-form';

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  helpText?: string;
  isMulti?: boolean;
  label?: string | React.ReactNode;
  checked?: boolean;
  mask?: string;
  example?: string;
  image?: string | React.ReactNode;
  detail?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & UseControllerProps<FormProps>;

export type InputProps = Partial<Props> &
  Partial<HTMLInputElement> & { label: string; append?: string; error: string; mask: string };

export const useControl = ({
  checked,
  control,
  defaultValue,
  example,
  helpText,
  mask,
  name,
  onChange,
  value,
  ...props
}: Props) => {
  const { field, formState } = useController({
    control,
    name,
    defaultValue,
  });

  const { onChange: fieldOnChange, ...fieldProps } = field;

  const errors = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (get(formState.errors, name) as any)?.message,
    [formState, name]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);

      fieldOnChange(event);
    },
    [fieldOnChange, onChange]
  );

  const input = React.useMemo(
    () =>
      ({
        ...fieldProps,
        ...props,
        name,
        mask,
        checked,
        id: value,
        ...(value && { value }),
        fontWeight: 'semibold',
        error: get(errors, name),
        onChange: handleChange,
      } as InputProps),
    [fieldProps, props, name, mask, checked, value, errors, handleChange]
  );

  const showExample = React.useMemo(() => !!example && !input.value, [example, input.value]);
  const showHelpText = React.useMemo(() => helpText && !errors, [errors, helpText]);

  return { input, errors, helpText, show: { example: showExample, helpText: showHelpText } };
};
