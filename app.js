const express = require('express')
const app = express()
const port = 3000
const tagRoutes = require('./routes/tag')

app.get('/', (req, res) => {
  res.send({ message: 'Hello welcome to Greecotopia API' })
})

app.use('/tags', tagRoutes)

app.listen(port, () => {
  console.log(`App listening in port ${port}`)
})