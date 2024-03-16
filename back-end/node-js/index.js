import Express from "express"
import bodyParser from "body-parser"


import rutaTipoFicha from "./src/routes/TipoFichaRoutes.js"
import rutaFicha from "./src/routes/FichaRoutes.js"
import rutaVariable from "./src/routes/VariableRoutes.js"
import rutaDetalle from "./src/routes/DetalleRoutes.js"



const serve = Express()
const port = 3000

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))


serve.use('/tipoFicha', rutaTipoFicha)
serve.use('/ficha', rutaFicha)
serve.use('/variable',rutaVariable)
serve.use('/detalle',rutaDetalle)

serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})

serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})


