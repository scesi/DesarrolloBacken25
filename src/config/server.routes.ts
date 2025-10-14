import {Request, Response, Router} from 'express'

import helthRoter from '../modules/helthCheck/helthCheck.route'
import VoteRouter from '../modules/votes/votos.routes'
import UserRouter from '../modules/users/users.routes'
import AuthRouter from '../modules/auth/auth.routes'
import PostsRouter from '../modules/posts/posts.routes'

const router = Router()

router.use('/', helthRoter)
router.use('/voto', VoteRouter)
router.use('/users', UserRouter)
router.use('/auth', AuthRouter)
router.use('/posts', PostsRouter)

router.use((req, res) => {
  res.status(404).send({
    message: 'page not found',
    status: 404,
    ok: false,
  })
})

export default router;
