import express from 'express'
import bodyParser from 'body-parser'
import router from './routes';
import helthRoter from './helthCheck/helthCheck.route';
import dotenv from 'dotenv'
import VoteRouter from './votos/votos.routes';

dotenv.config()

console.log('process.env.PORT', process.env.PORT)

const PORT = process.env.PORT || 3000;

const app = express()


app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)
app.use('/', helthRoter)
app.use('/', VoteRouter)

app.get('/test-ts', (req, res) => {
  res.send('Typescript funciona!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
