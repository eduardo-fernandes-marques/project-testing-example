import React from 'react';

import type { Platform } from '@models/flow';

import type { Props as FormProps } from '@components/forms';
import {
  DoocaIcon,
  LojaIntegradaIcon,
  MagentoIcon,
  NumvemshopIcon,
  OtherIcon,
  ShopifyIcon,
  TrayIcon,
  VtexIcon,
  WixIcon,
  WooIcon,
} from '@components/icons';
import { CustomRadio } from '@components/inputs/Radio';

import * as S from './Platforms.styles';

import type { UseControllerProps } from 'react-hook-form';

export type Payload = { image: string | React.ReactNode } & Platform;

const PLATFORM: { [key: string]: React.ReactNode } = {
  nuvemShop: <NumvemshopIcon label="nuvem shop" />,
  dooca: <DoocaIcon label="dooca" />,
  lojaIntegrada: <LojaIntegradaIcon label="loja integrada" />,
  magento: <MagentoIcon label="magento" />,
  vtex: <VtexIcon label="vtex" />,
  shopify: <ShopifyIcon label="shopify" />,
  tray: <TrayIcon label="tray" />,
  wix: <WixIcon label="wix" />,
  woo: <WooIcon label="woo" />,
  other: <OtherIcon label="other" />,
};

export type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  payload?: Platform[];
} & UseControllerProps<FormProps>;

export const Platforms: React.FC<Props> = ({ defaultValue, onChange, payload, ...props }) => {
  const [state, setState] = React.useState<string>(defaultValue as string);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);

    setState(event.target.value);
  };

  return (
    <S.Wrapper>
      {payload?.map(({ label, value }) => (
        <CustomRadio
          {...props}
          {...{ label, value, image: PLATFORM[value] }}
          key={label}
          value={value}
          onChange={handleChange}
          checked={state === value}
        />
      ))}
    </S.Wrapper>
  );
};
