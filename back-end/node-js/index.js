import Express from "express"
import bodyParser from "body-parser"
import mantenimiento from './src/routes/mantenimientoRuter.js';
import tipoMantRoutes from './src/routes/tipoMantRoutes.js';

const serve = Express()
const port = 3000

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))

serve.use("/mantenimiento", mantenimiento);
serve.use("/tipomantenimiento", tipoMantRoutes);

serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})

serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})