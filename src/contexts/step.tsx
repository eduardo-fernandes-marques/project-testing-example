/* eslint-disable import/no-cycle */
import React from 'react';

import type { Props } from '@hooks/useStep';
import { useStep } from '@hooks/useStep';

export const StepContext = React.createContext<Props>({} as Props);

export const StepProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = useStep();

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export const useStepContext = () => React.useContext(StepContext);
