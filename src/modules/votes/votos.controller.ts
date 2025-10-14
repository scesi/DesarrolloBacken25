import { Request, Response } from "express";
import {
  createVotoService,
  deleteVotoService,
  getVotoByIdService,
  getVotosService,
  updateVotoService,
} from "./votos.service";
import { IVoteFilter } from "./interfaces/votes.interface";

export const crearVoto = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // TODO: validar datos del body

    const result = await createVotoService(data)

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });  
      return;
    }
  
    res.status(201).send({
      message: result.message,
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en crearVoto:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const obtenerVotos = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    
    // Validación y sanitización segura de parámetros
    const filter: IVoteFilter = {};
    
    // Sanitizar y validar name
    if (query.name && typeof query.name === 'string') {
      const sanitizedName = query.name.trim();
      if (sanitizedName.length > 0 && sanitizedName.length <= 255) {
        filter.name = sanitizedName;
      }
    }
    
    // Sanitizar y validar status
    if (query.status !== undefined) {
      if (query.status === 'true') {
        filter.status = true;
      } else {
        filter.status = false;
      }
    }
    
    // Validar y parsear fechas de manera segura
    if (query.startAt && typeof query.startAt === 'string') {
      const startDate = new Date(query.startAt);
      if (!isNaN(startDate.getTime())) {
        filter.startAt = startDate;
      }
    }
    
    if (query.endsAt && typeof query.endsAt === 'string') {
      const endDate = new Date(query.endsAt);
      if (!isNaN(endDate.getTime())) {
        filter.endsAt = endDate;
      }
    }

    const result = await getVotosService(filter);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en obtenerVotos:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const obtenerVotoPorId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'ID de voto inválido',
        status: 400,
        ok: false,
      });
      return;
    }
    
    const result = await getVotoByIdService(numericId);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en obtenerVotoPorId:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

// actualizar todo el recurso
export const actualizarVoto = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = data.id;

    const result = await updateVotoService(Number(id), data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en actualizarVoto:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const actualizarVotoParcial =  async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'ID de voto inválido',
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await updateVotoService(numericId, data);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en actualizarVotoParcial:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}

export const eliminarVoto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'ID de voto inválido',
        status: 400,
        ok: false,
      });
      return;
    }

    const result = await deleteVotoService(numericId);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error en eliminarVoto:', error);
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}