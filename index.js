require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes/index')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})