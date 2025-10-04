import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import router from './config/server.routes'

// import router from './routes';
// import helthRoter from './helthCheck/helthCheck.route';
// import VoteRouter from './votos/votos.routes';

dotenv.config()

console.log('process.env.PORT', process.env.PORT)

const PORT = process.env.PORT || 3000;

const app = express()


app.use(bodyParser.json())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
