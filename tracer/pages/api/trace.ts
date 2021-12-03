import { NextApiRequest, NextApiResponse } from "next";
import helpers from '../../data/helpers';
import fs from "fs";

export default function dataHandler(req: NextApiRequest, res: NextApiResponse) {
  const formatted = helpers.getAll(req.body);
  let file;

  try {
    file = fs.readFileSync('./resolverData.json')
  } catch {
    file = fs.writeFileSync('./resolverData.json', 'w', );
  } finally {
    
  }

  res.status(200).send('Resolver data received!');
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}