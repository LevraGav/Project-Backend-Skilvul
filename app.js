const express = require('express')
const app = express()
const port = 3000
const forumRoutes = require('./routes/forum')

app.get('/', (req, res) => {
  res.send({ message: 'Hello welcome to Greecotopia API' })
})

app.use('/forums', forumRoutes)

app.listen(port, () => {
  console.log(`App listening in port ${port}`)
})