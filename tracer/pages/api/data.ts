import { NextApiRequest, NextApiResponse } from 'next';
import helpers from '../../data/helpers';
import { io } from "socket.io-client";

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    const data = helpers.getAll();
    helpers.reset();
    // console.log('data.ts', data);
    res.status(200).json({ data });
}