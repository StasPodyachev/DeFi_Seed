import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@services/request';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const url = `https://api.1inch.dev/swap/v5.2/${req.query.chainId}/swap`;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONE_INCH_API_KEY}`,
    },
    params: req.query,
  };

  const { status, data } = await api.get(url, config);

  if (status === 200) {
    return res.status(200).json(data);
  }

  return res.status(401).json({ error: '1inch error' });
}
