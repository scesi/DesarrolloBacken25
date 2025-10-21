import { Server as SocketIOServer, Socket } from 'socket.io'
import http from 'http'
import Server from '../config/server.config'
import { ENV } from './env.config';
// chatService

// maperar los usert del socket
const userSocketMap = new Map<string, string>(); // userId, socketId

const serverExpress = http.createServer(Server)
    
export const io = new SocketIOServer(
  serverExpress,
  // {
  //   cors: {
  //     origin: `http://localhost:${ENV.SOCKETIO_PORT}`,
  //     methods: ['GET', 'POST']
  //   }
  // }
)

export const initSocketIO = () => {

  // usar el midleware de autenticacion

  io.on('connection', (socket: Socket) => {
    console.log('socket data', socket.data)


    socket.on('test_env_recived', (data) => {
      console.log('test data', data)
    })

    // event send message'
    socket.on('send_message', (data: any) => {
      console.log('data any', data)
    })

  })

  io.on('disconect', () => {
    console.log('user is disconected')
    // limpiar el mapeo de usuarios
  })
}

io.listen(Number(ENV.SOCKETIO_PORT))
