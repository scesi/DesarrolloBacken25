import { Request, Response } from "express";

// mock database
let votos = [
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

export const crearVoto = (req: Request, res: Response) => {
  try {
    const data = req.body;
  
    // añadirlo a la "base de datos"
    const voto = {
      id: Date.now(),
      // name: data.name,
      // date: data.date,
      // count: data.count,
      // finished: data.finished,
      ...data,
    }
  
    votos.push(voto);
  
    res.status(201).send({
      message: 'Voto creado',
      status: 201,
      ok: true,
      data: voto,
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
  res.status(200).send({
    message: 'Votos obtenidos',
    status: 200,
    ok: true,
    data: votos,
  });

}

export const obtenerVotoPorId = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // version clasica
    // let voto = null;
    // for (let i = 0; i < votos.length; i++) {
    //   if (votos[i].id === Number(id)) {
    //     voto = votos[i];
    //     break;
    //   } 
    // }

    const voto = votos.find(v => {
      const isvalid = v.id === Number(id);
      return isvalid
    });

    // version acortada
    // const voto = votos.find(v => v.id === Number(id));
  
    if (voto === null) {
      res.status(404).send({
        message: 'Voto no encontrado',
        status: 404,
        ok: false,
      });
      return;
    }
  
    res.status(200).send({
      message: 'Voto obtenido',
      status: 200,
      ok: true,
      data: voto
    })
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

    const voto = votos.find(v => v.id === Number(id));

    if (!voto) {
      res.status(404).send({
        message: 'Voto no encontrado',
        status: 404,
        ok: false,
      });
      return;
    }

    voto.name = data.name;
    voto.date = data.date;
    voto.count = data.count;
    voto.finished = data.finished;

    votos.map(v => {
      if (v.id === Number(id)) {
        v.name = data.name;
        v.date = data.date;
        v.count = data.count;
        v.finished = data.finished;
      }
    });

    res.status(200).send({
      message: 'Voto actualizado',
      status: 200,
      ok: true,
      data: voto
    })
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

    const voto = votos.find(v => v.id === Number(id));

    if (!voto) {
      res.status(404).send({
        message: 'Voto no encontrado',
        status: 404,
        ok: false,
      });
      return;
    }

    voto.date = data.date;
    voto.count = data.count;
    voto.finished = data.finished;

    votos.map(v => {
      if (v.id === Number(id)) {
        v.date = data.date;
        v.count = data.count;
        v.finished = data.finished;
      }
    });

    res.status(200).send({
      message: 'Voto actualizado',
      status: 200,
      ok: true,
      data: voto
    })
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
    
    const votoIndex = votos.findIndex(v => v.id === Number(id));

    if (votoIndex === -1) {
      res.status(404).send({
        message: 'Voto no encontrado',
        status: 404,
        ok: false,
      });
      return;
    }

    const deletedVoto = votos[votoIndex];

    const newVotos = votos.filter(v => v.id !== Number(id));

    votos = newVotos;
    
    res.status(200).send({
      message: 'Voto eliminado',
      status: 200,
      ok: true,
      data: deletedVoto,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error interno del servidor',
      status: 500,
      ok: false,
    });
  }
}