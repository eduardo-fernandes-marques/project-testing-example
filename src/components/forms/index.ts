import type { Lead } from '@models/lead';

/* eslint-disable import/no-cycle */
export { Business } from './Business';
export { BusinessCheckpoint } from './BusinessCheckpoint';
export { Personal } from './Personal';
export { Template } from './Template';
export { OneTimePassword } from './OneTimePassword';
export { Platform } from './Platform';
export { Plan } from './Plan';

export type Props = Partial<Lead> & { formError: boolean };
