import { Socket } from 'socket.io'
import { io } from '../../config/socketio.config'
export const saveMessage = async (data: any) => {}

export const getConversationsHistory = async (userAId: string, userBId: string) => {}

// marcar mensajes como leido
export const sendMessage = (message: string) => {
  try {
    console.log('mensaje a enviar', message);
    
    io.emit('test_env',{message})
  } catch (error) {
    console.error('Error on send message socket IO')
  }
}