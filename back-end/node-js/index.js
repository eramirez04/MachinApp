import Express from "express"
import bodyParser from "body-parser"
import RutaUsuario from "./src/routes/UserRoutes.js";
import RutaRol from "./src/routes/RolUserRouter.js";
import ActivitiesRoutes from "./src/routes/ActivitiesRoutes.js"
import rutaSitio from "./src/routes/sitiosRouter.js"
import rutaSede from "./src/routes/sedesRouter.js"
import rutaCentro from "./src/routes/centrosRouter.js"
import rutaArea from "./src/routes/areasRouter.js"
import rutaTipoSitio from "./src/routes/tipo_sitioRouter.js"

const serve = Express()
const port = 3000

import cors from 'cors'

serve.use(cors())

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))

serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})
serve.use('/user',RutaUsuario)
serve.use('/rol',RutaRol)
serve.use('/actividades',ActivitiesRoutes)
serve.use('/tipositio',rutaTipoSitio)
serve.use('/sitio',rutaSitio)
serve.use('/sede', rutaSede)
serve.use('/centro', rutaCentro)
serve.use('/area', rutaArea)
serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})

