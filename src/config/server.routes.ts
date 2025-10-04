import {Request, Response, Router} from 'express'

import helthRoter from '../modules/helthCheck/helthCheck.route'
import VoteRouter from '../modules/votes/votos.routes'

const router = Router()

router.use('/', helthRoter)
router.use('/voto', VoteRouter)

router.use((req, res) => {
  res.status(404).send({
    message: 'page not found',
    status: 404,
    ok: false,
  })
})

export default router;
