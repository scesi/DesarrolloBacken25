import express from 'express'
import bodyParser from 'body-parser'
import router from './routes';

const PORT = 3003;

const app = express()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

app.get('/test-ts', (req, res) => {
  res.send('Typescript funciona!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
