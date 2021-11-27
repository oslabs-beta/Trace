import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { helpers } from '../../data/helpers';

export default function apiHandler(): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const data = helpers.getAll();
    res.status(200).json(data);
  }
}