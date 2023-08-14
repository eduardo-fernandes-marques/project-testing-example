/* eslint-disable import/no-cycle */
import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import Joi from 'joi';
import { get } from 'lodash';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { Lead } from '@models/lead';
import type { FormProps } from '@pages';

import { Checkbox, Input } from '@components/inputs';

import { ENDPOINT, PRIVACY_POLICY_URL } from '@utils/constants';
import { getPhoneTypeMask } from '@utils/masks';
import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import { Wrapper, WrapperError, WrapperFields } from '../Form.styles';
import * as S from './Personal.styles';

import type { Props as Payload } from '..';

export type Props = Pick<FormProps, 'onSubmit'>;

const resolver = Joi.object<Partial<Lead>>({
  email: VALIDATION.EMAIL,
  name: VALIDATION.TEXT,
  phone: VALIDATION.PHONE,
  acceptedPrivacyPolicy: VALIDATION.BOOLEAN,
});

export const Personal: React.FC<Props> = ({ onSubmit }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const [mask, setMask] = React.useState<string>(getPhoneTypeMask(lead?.phone));
  const [loading, setLoading] = React.useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMask(getPhoneTypeMask(event.target.value));
  }, []);

  const form = useForm<Payload>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { control, formState, handleSubmit, setError } = form;

  const errors = React.useMemo(() => get(formState.errors, 'formError')?.message, [formState]);

  const enhanceOnSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
      try {
        setLoading(true);

        if (!executeRecaptcha) {
          setError('formError', { message: ERROR.FORM });

          return;
        }

        const recaptchaToken = await executeRecaptcha();

        const { data: isValidUser } = await axios.post(ENDPOINT.RECAPTCHA.VALIDATE(), {
          recaptchaToken,
        });

        if (!isValidUser) {
          setLoading(false);

          throw new Error('Recaptcha Error: Invalid User');
        }

        await onSubmit(value);

        setNext();
      } catch (error) {
        setError('formError', { message: ERROR.FORM });
      } finally {
        setLoading(false);
      }
    },
    [executeRecaptcha, onSubmit, setError, setNext]
  );

  return (
    <Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <WrapperFields>
        <Input name="name" control={control} placeholder="*Seu nome" example="João" />

        <Input name="email" control={control} placeholder="*Seu email" example="joao@email.com" />

        <Input
          name="phone"
          control={control}
          placeholder="*Seu telefone"
          mask={mask}
          onChange={handleOnChange}
          example="(00) 0 0000-0000"
        />

        <S.WrapperCheckbox>
          <Checkbox
            checked={lead.acceptedPrivacyPolicy}
            name="acceptedPrivacyPolicy"
            control={control}
            label={
              <>
                Ao prosseguir você concorda com a
                <a href={PRIVACY_POLICY_URL}>{`política de privacidade `}</a>
                do examplo.
              </>
            }
          />
        </S.WrapperCheckbox>

        {errors && <WrapperError>{errors}</WrapperError>}
      </WrapperFields>

      <Actions loading={loading} />
    </Wrapper>
  );
};
