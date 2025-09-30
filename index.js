const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./src/routes')


const PORT = 3001;

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

// function getHelloWorld(req, res) {
//   res.send('Hello World!');
// }

// const getHelloWorld = (req, res) => {
//   res.send('Hello World!');
// }

// app.get('/hello', getHelloWorld)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
