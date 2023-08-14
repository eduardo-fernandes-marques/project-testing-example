import React from 'react';

import { useLead } from '@hooks/useLead';
import type { Props } from '@hooks/useLead';

export const LeadContext = React.createContext<Props>({} as Props);

export const LeadProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const [hasHydrated, setHasHydrated] = React.useState<boolean>(false);
  const [state, setState] = useLead(props);

  const isServer = typeof window === 'undefined';
  const useEffectFn = !isServer ? React.useLayoutEffect : React.useEffect;

  useEffectFn(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated ? (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LeadContext.Provider value={[state, setState]}>{children}</LeadContext.Provider>
  ) : (
    <div />
  );
};

export const useLeadContext = () => React.useContext(LeadContext);
