import { NextApiRequest, NextApiResponse } from 'next';

import type { Lead } from '@models/lead';

import { request } from '@utils/request';

const submitLeadEndpoint = (leadId: string) => `/leads/${leadId}/submit`;

export default async function handler({ query }: NextApiRequest, response: NextApiResponse<Lead>) {
  const { id } = query;

  (await request.post<void>(submitLeadEndpoint(id as string))).data;

  response.status(204).end();
}
