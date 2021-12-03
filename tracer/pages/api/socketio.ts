import { NextApiRequest } from 'next';
import { Server } from 'socket.io';

export default async (req: NextApiRequest, res: any) => {
  let data = await req.body;
  
  if (!res.socket.server.io) {

    const io = new Server(res.socket.server)

      io.on('connect', async (socket) => {
          socket.join('main')
          console.log('socketio.ts: connected')
      })

      io.on('disconnect', socket => {
          socket.leave('main')
      })

      res.socket.server.io = io;
  }

  if (data !== null) res.socket.server.io.emit('data', data)

  res.end();
}