import { NextApiRequest, NextApiResponse } from 'next';

import type { Lead } from '@models/lead';

import { request } from '@utils/request';

const activateLeadEndpoint = (leadId: string) => `/leads/${leadId}/activate`;

export default async function handler(
  { body, query }: NextApiRequest,
  response: NextApiResponse<Lead>
) {
  const { id } = query;

  (await request.post<void>(activateLeadEndpoint(id as string), body)).data;

  response.status(200).end();
}
