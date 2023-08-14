import { NextApiRequest, NextApiResponse } from 'next';

import type { Resource } from '@models/flow';

import { request } from '@utils/request';

const getFlowResourcesEndpoint = () => '/flow/resources';

export default async function handler(_: NextApiRequest, response: NextApiResponse<Resource>) {
  const result = (await request.get<Resource>(getFlowResourcesEndpoint())).data;

  response.status(200).json(result);
}
