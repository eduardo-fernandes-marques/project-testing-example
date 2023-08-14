/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import axios from 'axios';

import { useLeadContext } from '@contexts/lead';
import { useStepContext } from '@contexts/step';
import { useUTM } from '@hooks/useUTM';

import type { Resource } from '@models/flow';
import type { Lead } from '@models/lead';

import type { LayoutProps } from '@components/Layout';
import { Layout } from '@components/Layout';

import { ENDPOINT } from '@utils/constants';

import type { NextPage } from 'next';

export type Payload = Pick<Resource, 'segments' | 'revenues'> &
  Pick<Partial<Resource>, 'templates' | 'plans' | 'platforms'>;
export type FormProps = {
  onSubmit: (value: Partial<Lead>) => Promise<void>;
} & Payload;

type Props = NextPage & { Layout: LayoutProps };

const DEFAULT_VALUE = {
  segments: [{ label: 'Segmento', value: '' }],
  revenues: [{ label: 'Faturamento', value: '' }],
};

const Home: Props = () => {
  const {
    state: { current },
  } = useStepContext();
  const [lead, setLead] = useLeadContext();
  const [_, utm] = useUTM();

  const [state, setState] = React.useState<Payload>(DEFAULT_VALUE);

  const handleSubmit = React.useCallback(
    async (value: Partial<Lead>) => {
      try {
        const payload = { ...lead, ...value, ...utm };

        setLead((previous) => ({ ...previous, ...payload }));

        if (lead.id) {
          await axios.patch(ENDPOINT.LEAD.UPDATE(lead.id), payload);
        } else {
          const result = (await axios.post(ENDPOINT.LEAD.CREATE, payload)).data;

          setLead((previous) => ({ ...previous, ...result }));
        }
        // eslint-disable-next-line no-empty, @typescript-eslint/no-shadow
      } catch (_) {}
    },
    [lead, setLead, utm]
  );

  const fetch = React.useCallback(async () => {
    const result = (await axios.get<Resource>(ENDPOINT.FLOW.RESOURCES())).data;

    setState((previous) => ({
      ...previous,
      ...result,
      revenues: [...DEFAULT_VALUE.revenues, ...result.revenues],
      segments: [...DEFAULT_VALUE.segments, ...result.segments],
    }));
  }, []);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return <>{current.component({ ...state, onSubmit: handleSubmit })}</>;
};

Home.Layout = Layout;

export default Home;
