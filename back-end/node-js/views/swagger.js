import swaggerJsdoc from 'swagger-jsdoc'

import swaggerUi from 'swagger-ui-express'


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog API',
      version: '1.0.0',
    },
  },

  apis: ['../src/routes/.js'],
}
const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(
    `versiion 1 docs are avaliable at http://localhost:${port}/docs`
  )
}
export default swaggerDocs