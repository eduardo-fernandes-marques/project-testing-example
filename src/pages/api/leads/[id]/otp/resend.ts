import { NextApiRequest, NextApiResponse } from 'next';

import { request } from '@utils/request';

const resendOTPEndpoint = (leadId: string) => `/leads/${leadId}/resend/otp`;

export default async function handler(
  { query }: NextApiRequest,
  response: NextApiResponse<boolean>
) {
  const { id } = query;

  (await request.post<void>(resendOTPEndpoint(id as string))).data;

  response.status(204).end();
}
