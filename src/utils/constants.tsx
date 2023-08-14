import React from 'react';

import type { FormProps } from '@pages';

import {
  Business,
  BusinessCheckpoint,
  OneTimePassword,
  Personal,
  Plan,
  Platform,
  Template,
} from '@components/forms';

export const INITIAL_VALUES = {
  KEY: 'lead',
  PAYLOAD: {},
};

export const ENDPOINT = {
  LEAD: {
    CREATE: '/api/leads',
    UPDATE: (id: string) => `/api/leads/${id}/update`,
    ACTIVATE: (id: string) => `/api/leads/${id}/activate`,
    SUBMIT: (id: string) => `/api/leads/${id}/submit`,
    OTP: {
      RESEND: (id: string) => `/api/leads/${id}/otp/resend`,
    },
  },
  FLOW: {
    RESOURCES: () => '/api/flow/resources',
  },
  RECAPTCHA: {
    VALIDATE: () => '/api/recaptcha',
  },
};

export const IMAGE_HOST =
  process.env.NEXT_PUBLIC_APP_ENV !== 'production'
    ? '/images'
    : 'https://statics.example.io/img/starter-steps';

export const CONTACT_URL =
  'https://example.ac-page.com/lp-geral-example?utm_source=page_starter&utm_medium=cta&utm_campaign=site-starter';

export const STORE_TYPE = {
  HAS_ECOMMERCE_AND_PHYSICAL_STORE: 'hasEcommerceAndPhysicalStore',
  HAS_ECOMMERCE: 'hasECommerce',
  HAS_PHYSICAL_STORE: 'hasPhysicalStore',
  STARTING_FROM_BEGIN: 'startingFromBegin',
};

export const STEP = {
  FIRST: {
    value: 1,
    title: 'Primeiro, precisamos de algumas informações suas.',
    description:
      'Ter a sua loja com a tecnologia da Exemplo ficou mais simples e rápido. Crie sua loja em poucos passos! Para isso, primeiro precisamos de algumas informações do seu negócio.',
    component: (values: FormProps) => <Personal {...values} />,
  },
  SECOND: {
    value: 2,
    title: 'Agora queremos conhecer melhor o seu negócio.',
    description:
      'Nos conte mais sobre sua marca! Precisamos dessas informações para tortar a sua operação saudável e livre de problemas.',
    component: (values: FormProps) => <Business {...values} />,
  },
  THIRD: {
    value: 3,
    title: 'Em qual momento o seu negócio se identifica melhor?',
    description: 'Conte-nos como está o atualmente a sua operação',
    component: (values: FormProps) => <BusinessCheckpoint {...values} />,
  },
  FOURTH: {
    value: 4,
    title: 'Qual plataforma de e-commerce você utiliza?',
    description:
      'Nos diga qual ferramenta você utiliza atualmente. Selecione “outra” caso não esteja na lista. Isso nos ajudará a identificar o melhor processo de migração para você!',
    component: (values: FormProps) => <Platform {...values} />,
  },
  FIFTH: {
    value: 5,
    title: 'Conheça o seu template premium!',
    description:
      'Usaremos esse template para criar a sua loja performática e que irá encantar os seus consumidores.',
    component: (values: FormProps) => <Template {...values} />,
  },
  SIXTH: {
    value: 6,
    title: 'Selecione seu plano',
    description:
      'Temos planos para cada momento do seu negócio. Escolha o que se encontra melhor ou entre em contato com o nosso time comercial.',
    component: (values: FormProps) => <Plan {...values} />,
  },
  SEVENTH: {
    value: 7,
    title: 'Estamos quase lá!',
    description:
      'Por favor, confirme o código de verificação que enviamos para seu celular e e-mail.',
    component: (values: FormProps) => <OneTimePassword {...values} />,
  },
  EIGHTH: {
    value: 8,
    title: 'Agora falta pouco!',
    description:
      'Estamos organizando tudo aqui para disponibilizarmos o ambiente administrativo da sua loja virtual. Aguarde alguns minutos e verifique sua caixa de e-mail para acessar e configurar sua loja.',
    // eslint-disable-next-line react/jsx-no-useless-fragment
    component: () => <></>,
  },
};

export const PRIVACY_POLICY_URL =
  'https://example.com/pt-br/seguranca-e-privacidade/politica-de-privacidade/?utm_source=starter.example.com.br&utm_campaing=StarterPolicyAgreement&utm_medium=referral';
