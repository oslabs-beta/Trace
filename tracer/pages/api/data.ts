import { NextApiRequest, NextApiResponse } from 'next';
import { helpers } from '../../data/helpers';

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    const rawData = helpers.getAll();
    const avgData = helpers.getAvgs();
    res.status(200).json({ rawData, avgData });
}