import { Request, Response } from "express";
import * as ChatService from './chat.service'

export const sendMessage = async (req: Request, res: Response) => {
  const { message} = req.body;

  await ChatService.sendMessage(message)

  res.status(200).send({
    ok: true,
    message: "Mensaje enviado",
    status: 200,
  })
}