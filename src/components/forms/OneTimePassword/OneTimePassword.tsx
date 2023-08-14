/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { Modal } from '@mui/material';
import axios from 'axios';
import Joi from 'joi';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';

import type { Lead } from '@models/lead';
import type { FormProps } from '@pages';

import { ENDPOINT } from '@utils/constants';
import { ERROR, VALIDATION } from '@utils/validations';

import { Actions } from '../Actions';
import { Wrapper, WrapperError, WrapperFields } from '../Form.styles';
import * as S from './OneTimePassword.styles';

import type { Props } from '..';

const DEFAULT_STATE = ['', '', '', '', '', ''];

type Ref = {
  [key: string]: React.MutableRefObject<HTMLInputElement | undefined>;
};

export const OneTimePassword: React.FC<FormProps> = ({ onSubmit }) => {
  const [lead] = useLeadContext();
  const {
    action: { setNext },
  } = useStepContext();

  const [state, setState] = React.useState<string[]>(DEFAULT_STATE);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const inputs = DEFAULT_STATE.reduce((previous, _, index) => {
    return {
      ...previous,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [index]: React.useRef<HTMLInputElement>(),
    };
  }, {} as Ref);

  const resolver = React.useMemo(
    () =>
      Joi.object<Props>({
        otp: VALIDATION.OTP,
      }),
    []
  );

  const form = useForm<Props>({
    mode: 'onChange',
    defaultValues: lead,
    resolver: joiResolver(resolver, { allowUnknown: true, abortEarly: false }),
  });

  const { formState, handleSubmit, setError, setValue } = form;

  const errors = React.useMemo(
    () => get(formState.errors, 'otp')?.message ?? get(formState.errors, 'formError')?.message,
    [formState]
  );

  const handleToogleModal = React.useCallback(() => setOpen((previous) => !previous), []);

  const handleOnPaste = React.useCallback(
    (value: string) => {
      Object.entries(inputs).forEach(([_, input]) => {
        if (input.current) {
          setState(value.split(''));
        }
      });
    },
    [inputs]
  );

  const handleChange = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      if (value.length === 6) return handleOnPaste(value);

      const [first, second] = value;

      setState((previous) => ({ ...previous, [name]: !second ? first : second }));

      const input = Object.entries(inputs).find(
        ([key]) => key === (Number(name) + 1).toString()
      )?.[1];

      if (input?.current) input.current.focus();
    },
    [handleOnPaste, inputs]
  );

  const handleOnClick = React.useCallback(async () => {
    try {
      /* istanbul ignore else */
      if (lead.id) await axios.get(ENDPOINT.LEAD.OTP.RESEND(lead.id));

      handleToogleModal();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, [handleToogleModal, lead.id]);

  const enhanceOnSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
      try {
        setLoading(true);
        onSubmit(value);

        /* istanbul ignore else */
        if (lead.id) await axios.post<void>(ENDPOINT.LEAD.ACTIVATE(lead.id), { ...lead, ...value });

        setLoading(false);
        setNext();
      } catch (error) {
        setLoading(false);
        setError('formError', { message: ERROR.FORM });
      }
    },
    [lead, onSubmit, setError, setNext]
  );

  React.useEffect(() => setValue('otp', Object.values(state).join('')), [setValue, state]);

  return (
    <Wrapper onSubmit={handleSubmit(enhanceOnSubmit)}>
      <WrapperFields>
        <S.WrapperCodes>
          {Object.entries(inputs).map(([key, value]) => (
            <S.Input
              key={key}
              name={key}
              onChange={handleChange}
              value={state[key as unknown as number]}
              ref={value as React.RefObject<HTMLInputElement>}
            />
          ))}
        </S.WrapperCodes>

        {errors && <WrapperError>{errors}</WrapperError>}

        <S.Link type="button" onClick={handleOnClick}>
          Reenviar código
        </S.Link>

        <Modal open={open} onClose={handleToogleModal}>
          <>
            <h3>E-mail reenviado.</h3>
            <span>Verifique seu e-mail para recuperar o código</span>

            <S.WrapperActions>
              <button type="button" onClick={handleToogleModal}>
                Fechar
              </button>
            </S.WrapperActions>
          </>
        </Modal>
      </WrapperFields>

      <Actions loading={loading} />
    </Wrapper>
  );
};
