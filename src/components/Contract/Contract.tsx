/* eslint-disable react/no-danger */
import React from 'react';

import { Modal } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Props as FormProps } from '@components/forms';
import { Checkbox } from '@components/inputs';

import contract from './contract.md';
import * as S from './Contract.styles';

import type { UseControllerProps } from 'react-hook-form';

export type Props = UseControllerProps<FormProps>;

export const Contract: React.FC<Props> = ({ control, defaultValue, name }) => {
  const [isOPenContractContent, setIsOpenContractContent] = React.useState(false);

  const toggleContractContent = () => setIsOpenContractContent((previous) => !previous);

  return (
    <>
      <S.WrapperCheckbox>
        <Checkbox
          checked={Boolean(defaultValue) || false}
          name={name}
          control={control}
          label={
            <>
              Aceito os
              <button type="button" onClick={toggleContractContent}>
                termos do contrato
              </button>
            </>
          }
        />
      </S.WrapperCheckbox>

      <Modal open={isOPenContractContent} onClose={toggleContractContent}>
        <>
          <S.WrapperContent>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contract}</ReactMarkdown>
          </S.WrapperContent>

          <S.WrapperActions>
            <button type="button" onClick={toggleContractContent}>
              Fechar
            </button>
          </S.WrapperActions>
        </>
      </Modal>
    </>
  );
};
