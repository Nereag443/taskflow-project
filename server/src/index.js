const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

const { port } = require('./config/env')

const taskRoutes = require('./routes/task.routes')
const userPreferencesRoutes = require('./routes/userPreferences')

app.use(cors())
app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/user/preferences', userPreferencesRoutes)

app.use(express.static(path.join(__dirname, '../../maqueta-tailwind/public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../maqueta-tailwind/public/index.html'))
})

app.use((err, req, res, next) => {

  if (err.message === 'NOT_FOUND') {

    return res.status(404).json({
      error: 'Recurso no encontrado'
    })

  }

  console.error(err)

  res.status(500).json({
    error: 'Error interno del servidor'
  })

})


app.listen(port, () => {

  console.log(`Servidor corriendo en puerto ${port}`)

})