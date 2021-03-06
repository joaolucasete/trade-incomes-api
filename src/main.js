const express = require('express')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const api = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const authRoutes = require('./routes/auth')
app.use('/auth/', authRoutes)

api.use('/api', app)

const server = api.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Server listening at http://${host}:${port}`)
})
