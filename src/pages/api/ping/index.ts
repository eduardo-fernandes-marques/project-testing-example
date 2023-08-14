import type { NextApiRequest, NextApiResponse } from 'next';

const response = 'Pong';

export default function handler(_: NextApiRequest, res: NextApiResponse<string>) {
  res.status(200).json(response);
}
