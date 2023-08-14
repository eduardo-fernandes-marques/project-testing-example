/* eslint-disable import/no-cycle */
import React from 'react';

import type { FormProps } from '@pages';

import { STEP } from '@utils/constants';

export const COMPLETE_FLOW = STEP;

export const WITHOUT_ECOMMERCE_FLOW = {
  ...STEP,
  FOURTH: {
    ...STEP.FIFTH,
    value: 4,
  },
  FIFTH: {
    ...STEP.SIXTH,
    value: 5,
  },
  SIXTH: {
    ...STEP.SEVENTH,
    value: 6,
  },
  SEVENTH: {
    ...STEP.EIGHTH,
    value: 7,
  },
};

export type Status = 'HALF_COMPLETED' | 'NOT_COMPLETED' | 'COMPLETED';
export type StepId = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH' | 'SIXTH' | 'SEVENTH';
export type Step = {
  value: number;
  title: string;
  description: string;
  component: (value: FormProps) => React.ReactNode;
};

type FlowMap = { [key: string]: Step };

export type Action = {
  setPrevious: () => void;
  setNext: () => void;
  getStatus: (step: number) => Status;
  isFinishStep: (step: number) => boolean;
  getSteps: () => Step[];
  setWithoutEcommerceFlow: (value: boolean) => void;
};

export type Props = { state: State; action: Action };

export type State = {
  flow: FlowMap;
  current: Step;
};

type Reducer = (state: State, action: ReducerAction) => State;

type ReducerAction =
  | { type: typeof ACTION.PREVIOUS }
  | { type: typeof ACTION.NEXT }
  | { type: typeof ACTION.SET_WITHOUT_ECOMMERCE_FLOW; payload: boolean };

export const STATUS: { [key in Status]: Status } = {
  HALF_COMPLETED: 'HALF_COMPLETED',
  NOT_COMPLETED: 'NOT_COMPLETED',
  COMPLETED: 'COMPLETED',
};

export const FLOW = {
  COMPLETE: COMPLETE_FLOW,
  WITHOUT_ECOMMERCE_FLOW,
};

const INITIAL_STATE = {
  flow: FLOW.WITHOUT_ECOMMERCE_FLOW,
  current: FLOW.COMPLETE.FIRST,
};

enum ACTION {
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT',
  TOOGLE_FLOW = 'TOOGLE_FLOW',
  SET_WITHOUT_ECOMMERCE_FLOW = 'SET_WITHOUT_ECOMMERCE_FLOW',
}

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case ACTION.PREVIOUS: {
      return {
        ...state,
        current: Object.values(state.flow).find(
          ({ value }) => value === state.current.value - 1
        ) as Step,
      };
    }
    case ACTION.NEXT: {
      return {
        ...state,
        current: Object.values(state.flow).find(
          ({ value }) => value === state.current.value + 1
        ) as Step,
      };
    }

    case ACTION.SET_WITHOUT_ECOMMERCE_FLOW: {
      return {
        ...state,
        flow: action.payload ? FLOW.WITHOUT_ECOMMERCE_FLOW : FLOW.COMPLETE,
      };
    }

    /* istanbul ignore next */
    default:
      return state;
  }
};

export const useStep = (): Props => {
  const [state, dispatch] = React.useReducer<Reducer>(reducer, INITIAL_STATE);

  const setPrevious = React.useCallback(() => dispatch({ type: ACTION.PREVIOUS }), []);

  const setNext = React.useCallback(() => {
    dispatch({ type: ACTION.NEXT });
  }, []);

  const getStatus = React.useCallback(
    (step: number) => {
      if (step === state.current.value) return STATUS.NOT_COMPLETED;

      if (state.current.value - 1 === step) return STATUS.HALF_COMPLETED;

      if (state.current.value - 1 > step) return STATUS.COMPLETED;

      return STATUS.NOT_COMPLETED;
    },
    [state]
  );

  const setWithoutEcommerceFlow = React.useCallback(
    (value: boolean) => dispatch({ type: ACTION.SET_WITHOUT_ECOMMERCE_FLOW, payload: value }),
    []
  );

  const isFinishStep = React.useCallback(
    (step: number) =>
      step < Math.max(...Object.values(state.flow).map(({ value }) => value - 1), 0),
    [state.flow]
  );

  const getSteps = React.useCallback(
    () =>
      Object.values(state.flow).filter(
        ({ value }) => value !== Math.max(...Object.values(state.flow).map((step) => step.value), 0)
      ),
    [state.flow]
  );

  return {
    state,
    action: {
      setPrevious,
      setNext,
      getStatus,
      isFinishStep,
      getSteps,
      setWithoutEcommerceFlow,
    },
  };
};
