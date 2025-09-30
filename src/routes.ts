// const Router = require('express').Router;
// const Router = express.Router;

// destructuring
// const { Router } = express;
import { Router } from 'express'
import { saveVoteController } from './controllers';

const router = Router();

router.get('/hello', (req, res) => {
  res.send('Hello World!');
});

router.post('/vote', saveVoteController);

export default router;
