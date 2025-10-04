import { Router } from 'express'
import { crearVoto, obtenerVotos, actualizarVoto, actualizarVotoParcial, obtenerVotoPorId, eliminarVoto  } from './votos.controller'

const VoteRouter = Router()

// C.R.U.D.
// create
VoteRouter.post('/', crearVoto)

// read
VoteRouter.get('/', obtenerVotos)
VoteRouter.get('/:id', obtenerVotoPorId )

// update
VoteRouter.put('/:id', actualizarVoto)
VoteRouter.patch('/:id', actualizarVotoParcial)

// delete
VoteRouter.delete('/:id', eliminarVoto);

export default VoteRouter
