import { Request, Response } from "express";
import {
  createVotoService,
  deleteVotoService,
  getVotoByIdService,
  getVotosService,
  updateVotoService,
} from "./votos.service";

export const crearVoto = (req: Request, res: Response) => {
  try {
    const data = req.body;

    // TODO: validar datos del body

    const result = createVotoService(data)

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });  
    }
  
    res.status(201).send({
      message: result.message,
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const obtenerVotos = (req: Request, res: Response) => {
  try {
    const result = getVotosService();

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const obtenerVotoPorId = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = getVotoByIdService(Number(id));

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

// actualizar todo el recurso
export const actualizarVoto = (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id;

    const result = updateVotoService(Number(id), data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const actualizarVotoParcial = (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const result = updateVotoService(Number(id), data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const eliminarVoto = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = deleteVotoService(Number(id));

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}