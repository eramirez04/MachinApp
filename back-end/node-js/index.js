import Express from "express"
import bodyParser from "body-parser"


const serve = Express()
const port = 3000

serve.use(bodyParser.json())
serve.use(bodyParser.urlencoded({extended : false}))

serve.get('/', (req,res) =>{
  res.status(200).json({"mensaje" : "Bienvenidos a MachinApp"})
})

serve.listen(port,()=>{
  console.log(`servidor escuchando en el http://localhost:${port}`)
})








