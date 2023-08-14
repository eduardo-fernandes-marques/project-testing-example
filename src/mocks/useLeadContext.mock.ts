import { Props } from '@hooks/useLead';

export const useLeadContextMock = [
  {
    id: 'fake-id',
    name: 'fake name',
    email: 'fake@mail.com',
  },
  jest.fn(),
] as Props;
