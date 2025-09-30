import { Request, Response } from "express";

export const saveVoteController = (req: Request, res: Response) => {
  const data = req.body;

  if (data.count < 40) {
    res.status(400).send({
      message: 'Cantidad de votos insuficiente',
      status: 400,
      ok: false,
    });
    return;
  }

  res.status(200).send({
    message: 'Voto recibido',
    status: 200,
    ok: true,
  });
}
