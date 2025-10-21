import { Server as SocketIOServer } from 'socket.io'
import http from 'http'

import { sequelize } from './config/database.config';

import Server from './config/server.config'
import { ENV } from './config/env.config'
import { initSocketIO } from './config/socketio.config';

async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.info('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setTimeout(connectWithRetry, 5000);
  }
}

async function start() {
  try {
    await connectWithRetry()
    // await sequelize.authenticate(); 
    // await sequelize.sync();

    // const serverExpress = http.createServer(Server)
    
    // const io = new SocketIOServer(
    //   serverExpress,
    //   // {
    //   //   cors: {
    //   //     origin: `http://localhost:${ENV.SOCKETIO_PORT}`,
    //   //     methods: ['GET', 'POST']
    //   //   }
    //   // }
    // )

    initSocketIO();

    // io.listen(Number(ENV.SOCKETIO_PORT))

    // console.log(`Server Socket io is running on http://localhost:${ENV.SOCKETIO_PORT}`)

    console.info('Se ha conectado a la base de datos!')
    
    Server.listen(ENV.PORT, () => {
      console.log(`Server is running on http://localhost:${ENV.PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor', error)
  }
}

start()
