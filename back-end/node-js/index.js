import Express from "express"
import bodyParser from "body-parser"
import rutaSede from "./src/routes/sedesRouter.js"
import rutaTipoSitio from "./src/routes/tipo_sitioRouter.js"
import rutaCentro from "./src/routes/centrosRouter.js"
import rutaArea from "./src/routes/areasRouter.js"
import rutaSitio from "./src/routes/sitiosRouter.js"

const serve = Express()
const port = 3000

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))

serve.use('/sede', rutaSede)
serve.use('/centro', rutaCentro)
serve.use('/tipositio', rutaTipoSitio)
serve.use('/area', rutaArea)
serve.use('/sitio', rutaSitio)

serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})

serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})