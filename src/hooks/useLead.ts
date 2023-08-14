import type { Lead } from '@models/lead';

import { useSessionStorage } from './useSessionStorage';

import type { Props as SessionStorageProps } from './useSessionStorage';

export type Props = SessionStorageProps<Partial<Lead>>;

export const useLead = (props?: Partial<Lead>) =>
  useSessionStorage<Partial<Lead>>({ key: 'lead', payload: props });
