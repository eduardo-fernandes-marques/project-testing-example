import { NextApiRequest, NextApiResponse } from 'next';

import { request } from '@utils/request';

const getRecaptchaEndpoint = () => '/recaptcha';

export default async function handler(
  { body }: NextApiRequest,
  response: NextApiResponse<boolean>
) {
  const result = (await request.post<boolean>(getRecaptchaEndpoint(), body)).data;

  response.status(200).json(result);
}
