import Express from "express"
import bodyParser from "body-parser"
import ActivitiesRoutes from "./src/routes/ActivitiesRoutes.js"


const serve = Express()
const port = 3000

import cors from 'cors'

serve.use(cors())

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))


serve.use(Express.static('./public'))
serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})

serve.use('/actividades',ActivitiesRoutes)

serve.use('/documents',(req,res)=>{
  res.render('documentacion.ejs')
})

serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})

