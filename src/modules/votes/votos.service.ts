// import { IServiceResponse } from "../types/services.interface";
import { IServiceResponse } from "../../types";
import { ICreateVoto } from "./dtos/CreateVote.dto";
import { IVoto } from "./interfaces/votes.interface";

// mock database
let votos: IVoto[] = [
  {
    id: 1, // se genera en la base de datos
    name: "Votos nulos",
    date: "2025-09-29",
    count: 33,
    finished: true
  },
  {
    id: 2, // se genera en la base de datos
    name: "Votos válidos",
    date: "2025-09-29",
    count: 200,
    finished: true
  },
  {
    id: 3, // se genera en la base de datos
    name: "Votos blancos",
    date: "2025-09-29",
    count: 120,
    finished: true
  },
];

export const createVotoService = (payload: ICreateVoto): IServiceResponse<IVoto> => {
  try {
    const voto: IVoto = {
      id: Date.now(),
      ...payload,
    }
  
    votos.push(voto);
  
    return {
      message: 'Voto creado',
      ok: true,
      data: voto
    }
  } catch (error) {
    return {
      message: 'Voto no creado',
      ok: false,
    }
  }
}

export const getVotosService = (): IServiceResponse<IVoto[]> => {
  try {
    return {
      message: 'Votos obtenidos',
      ok: true,
      data: votos,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al obtener los votos',
      ok: false,
    }
  }
}

export const getVotoByIdService = (id: number): IServiceResponse<IVoto> => {
  try {
    const voto = votos.find(v => v.id === id);
    
    if (!voto) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }
    
    return {
      message: 'Voto obtenido',
      ok: true,
      data: voto,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al obtener el voto',
      ok: false,
    }
  }
}

export const updateVotoService = (id: number, payload: ICreateVoto): IServiceResponse<IVoto> => {
  try {
    const voto = votos.find(v => v.id === id);
    
    if (!voto) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }
    // update voto
    voto.name = payload.name;
    voto.date = payload.date;
    voto.count = payload.count;
    voto.finished = payload.finished;
    
    return {
      message: 'Voto actualizado',
      ok: true,
      data: voto,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al actualizar el voto',
      ok: false,
    }
  }
}

export const deleteVotoService = (id: number): IServiceResponse<IVoto> => {
  try {
    // find voto
    const voto = votos.find(v => v.id === id);
    if (!voto) {
      return {
        message: 'Voto no encontrado',
        ok: false,
      }
    }
    // delete voto
    const newVotos = votos.filter(v => v.id !== id);
    votos = newVotos;
    return {
      message: 'Voto eliminado',
      ok: true,
      data: voto,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al eliminar el voto',
      ok: false,
    }
  }
}