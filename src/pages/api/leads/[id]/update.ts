import { NextApiRequest, NextApiResponse } from 'next';

import type { Lead } from '@models/lead';

import { request } from '@utils/request';

const updateLeadEndpoint = (leadId: string) => `/leads/${leadId}`;

export default async function handler(
  { body, query }: NextApiRequest,
  response: NextApiResponse<Lead>
) {
  const { id } = query;

  (await request.patch<Lead>(updateLeadEndpoint(id as string), body)).data;

  response.status(204).end();
}
