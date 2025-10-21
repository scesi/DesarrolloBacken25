import { Router } from 'express'
import * as ChatController from './chat.controller'

const ChatRouter = Router()

ChatRouter.post('/send_message', ChatController.sendMessage)


export default ChatRouter