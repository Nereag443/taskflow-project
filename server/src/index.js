const express = require('express')
const cors = require('cors')
const swaggerUi = require ('swagger-ui-express')
const swaggerSpec = require ('./config/swagger')

const app = express()

const taskRoutes = require('./routes/task.routes')
const userPreferencesRoutes = require('./routes/userPreferences')

app.use(cors({
  origin: 'https://taskflow-project-tailwind-two.vercel.app'
}))
app.use(express.json())

app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/user/preferences', userPreferencesRoutes)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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


module.exports = app;