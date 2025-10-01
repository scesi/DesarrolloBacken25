import { Router } from 'express'
import { crearVoto, obtenerVotos, actualizarVoto, actualizarVotoParcial, obtenerVotoPorId, eliminarVoto  } from './votos.controller'

const VoteRouter = Router()

// C.R.U.D.
// create
VoteRouter.post('/crearVoto', crearVoto)

// read
VoteRouter.get('/obtenerVotos', obtenerVotos)
VoteRouter.get('/obtenerVotoPorId/:id', obtenerVotoPorId )

// update
VoteRouter.put('/actualizaVoto/:id', actualizarVoto)
VoteRouter.patch('/actualizarVotoParcial/:id', actualizarVotoParcial)

// delete
VoteRouter.delete('/eliminarVoto/:id', eliminarVoto);

export default VoteRouter
