import React from 'react';

import { Tooltip } from '@mui/material';
import Image from 'next/image';

import { useControl } from '@hooks/useControl';
import type { Props as ControlProps, InputProps } from '@hooks/useControl';

import type { Option } from '@models/flow';

import { CONTACT_URL } from '@utils/constants';

import * as S from './Custom.styles';

export type Props = {
  options?: Option[];
  detail?: string;
};

const Item = ({ detail, input, options }: { input: InputProps } & Props) => {
  return (
    <label htmlFor={input.value}>
      <input {...input} type="radio" />

      <S.WrapperItemOptionHeader checked={input.checked}>
        <span>{input.label}</span>

        {detail ? <div>{detail}</div> : <S.Link href={CONTACT_URL}>Consultar</S.Link>}
      </S.WrapperItemOptionHeader>

      <S.WrapperItemOptionsDescription>
        {options?.map(({ checked: optionChecked, title }) => (
          <S.WrapperItemOptionDescription key={title}>
            <div>
              {optionChecked ? (
                <svg name="success-outline" color="#F56A00" />
              ) : (
                <svg name="close-outline" color="#b6b9d0" />
              )}
            </div>
            {title}
          </S.WrapperItemOptionDescription>
        ))}
      </S.WrapperItemOptionsDescription>
    </label>
  );
};

export const Custom = ({
  checked,
  control,
  detail,
  disabled,
  image,
  name,
  options,
  ...props
}: ControlProps & Props) => {
  const { input } = useControl({ control, checked, name, disabled, ...props });

  if (image) {
    return (
      <S.WrapperItemIcon checked={checked}>
        <label htmlFor={input.value}>
          <input {...input} type="radio" />

          <S.WrapperIcon>
            {typeof image === 'string' ? <Image src={image} alt={input.label} fill /> : image}
          </S.WrapperIcon>
        </label>
      </S.WrapperItemIcon>
    );
  }

  return (
    <S.WrapperItemOption checked={checked}>
      {disabled ? (
        <Tooltip title="Fale com um especialista para contratar esse plano.">
          <Item input={input} detail={detail} options={options} />
        </Tooltip>
      ) : (
        <Item input={input} detail={detail} options={options} />
      )}
    </S.WrapperItemOption>
  );
};
