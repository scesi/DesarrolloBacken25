import Vote from "./models/votes.model";
import { Op } from "sequelize";

import { ICreateVoto } from "./dtos/CreateVote.dto";

import { IVoteFilter, IVoto } from "./interfaces/votes.interface";

import { IServiceResponse } from "../../types";
import { sequelize } from "../../config/database.config";

export const createVotoService = async (payload: ICreateVoto): Promise<IServiceResponse<IVoto>> => {
  try {
    const voto = await Vote.create(payload)
  
    return {
      message: 'Voto creado',
      ok: true,
      data: voto.dataValues
    }
  } catch (error) {
    return {
      message: 'Voto no creado',
      ok: false,
    }
  }
}

export const getVotosService = async (filter: IVoteFilter ): Promise<IServiceResponse<Vote[]>> => {
  try {
    const whereConditions: any = {};
    
    if (filter.name) {
      whereConditions.name = {
        [Op.iLike]: `%${filter.name}%`
      };
    }
    
    if (filter.status !== undefined) {
      whereConditions.finished = filter.status;
    }
    
    // // Aplicar filtros de fecha de manera segura
    if (filter.startAt || filter.endsAt) {
      const dateFilter: any = {};
      
      if (filter.startAt) {
        dateFilter[Op.gte] = filter.startAt;
      }
      
      if (filter.endsAt) {
        dateFilter[Op.lte] = filter.endsAt;
      }
      
      whereConditions.date = dateFilter;
    }

    const votes = await Vote.findAll({
      where: whereConditions,
      order: [['createdAt', 'DESC']],
      limit: 100 // Limitar resultados para evitar sobrecarga
    });

    // sequelize.query(`
    //   SELECT id, name, date, count, finished, created_at AS createdAt, updated_at AS updatedAt 
    //   FROM votes 
    //   WHERE name ILIKE '%blanco%' 
    //   AND finished = false 
    //   ORDER BY created_at DESC 
    //   LIMIT 100;
    // `)

    return {
      message: 'Votos obtenidos',
      ok: true,
      data: votes,
    }
  } catch (error) {
    console.error('Error en getVotosService:', error)
    return {
      message: 'Error al obtener los votos',
      ok: false,
    }
  }
}

export const getVotoByIdService = async (id: number): Promise<IServiceResponse<IVoto>> => {
  try {
    const vote = await Vote.findByPk(id);
    
    if (!vote) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }
    
    return {
      message: 'Voto obtenido',
      ok: true,
      data: vote.dataValues,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al obtener el voto',
      ok: false,
    }
  }
}

export const updateVotoService = async (id: number, payload: ICreateVoto): Promise<IServiceResponse<number>> => {
  try {
    const response = await Vote.update(payload, {
      where: {
        id,
      }
    })
    
    if (response[0] === 0) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }

    return {
      message: 'Voto actualizado',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al actualizar el voto',
      ok: false,
    }
  }
}

export const deleteVotoService = async (id: number): Promise<IServiceResponse<number>> => {
  try {
    const response = await Vote.destroy({
      where: {
        id,
      },
      // force: true // HARD - delete
    });

    if (response === 0 ) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }

    // vote
    return {
      message: 'Voto eliminado',
      ok: true,
      data: response,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al eliminar el voto',
      ok: false,
    }
  }
}