import type { NextApiRequest, NextApiResponse } from 'next';
import { SEPOLIA_CHAIN_ID } from '@constants';

// Update if added new chain
const ADDRESSES = {
  [SEPOLIA_CHAIN_ID]: {
    Factory: '0x1fB7818df633C77B5a708Aa8fd368385376e4a9b',
    D4X: '0x3594abbDEef3b3323aD91401882f1F756AbCB437',
    UniswapExchange: '0xDAD128ae687588C2Cceb75B02587e93c7ea5aFEc',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { address } = req.query;

  if (!address) {
    return res.status(401).json({ error: 'No address' });
  }

  res.status(200).json(ADDRESSES);
}
