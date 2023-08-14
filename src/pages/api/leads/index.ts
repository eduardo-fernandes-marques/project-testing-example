import { NextApiRequest, NextApiResponse } from 'next';

import type { Lead } from '@models/lead';

import { request } from '@utils/request';

const createLeadEndpoint = () => '/leads';

export default async function handler({ body }: NextApiRequest, response: NextApiResponse<Lead>) {
  const result = (await request.post<Lead>(createLeadEndpoint(), body)).data;

  response.status(201).json(result);
}
