const express = require('express')
const app = express()
const port = 3000
const messageRoutes = require('./routes/message')

app.get('/', (req, res) => {
  res.send({ message: 'Hello welcome to Greecotopia API' })
})

app.use('/messages', messageRoutes)

app.listen(port, () => {
  console.log(`App listening in port ${port}`)
})