import React,{useState,useEffect} from "react"
import api from "../../Api.jsx"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import ButtonTHA from "../ButtonTHA.jsx"
import Alert from "../../Alert.jsx";

const RegistroTHA=()=>{

    const [acti_nombre,setNombre]=useState('');

    const {register, formState: {errors}, handleSubmit} = useForm()


    const navigate=useNavigate()

    const handleCreateTask=async(e)=>{
            try {
                const result=await api.post('actividades/registrar',{
                    acti_nombre:acti_nombre,
                }).finally(()=>{
                    navigate("/Home")
                })
                console.log('Tarea creada',result.data)
                setNombre('')
            } catch (error) {
                console.error('error al crear la actividad',error)
            }
        

        
    }
    
    const [tecnicos, setTecnicos] = useState([])

    useEffect(()=>{
        const buscarTecnicos= async ()=>{
            try{
                const response = await api.get('/user/tecnico')
                setTecnicos(response.data.resultado)

                
            } catch(error){
                console.error(error)
            }
        }

        buscarTecnicos() 
    }, [])
    return (
      <>
      <div className="max-w-md mx-auto pb-16 ">

              <form onSubmit={handleSubmit(handleCreateTask)}>
                    <h1 className=" text-2xl pb-3">Registrar Tecnico</h1>
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="floating_email" id="floating_email"
                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                             placeholder=" "
                             value={acti_nombre}
                             {...register("nombres", {required: true})}
                             onChange={(e) => setNombre(e.target.value)}

                      />
                      <label htmlFor="floating_email"
                             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          identificacion
                      </label>
                      {
                          errors.identificacion?.type === "required" && (
                              <Alert descripcion="Nombre requirido"/>
                          )
                      }
                  </div>

                  <ButtonTHA value="Registrarse"/>
              </form>
              <div>

                    {
                        tecnicos.map((tecnico) =>(
                            <select key={tecnico.idUsuarios} name="" id="">
                                <option  value="">{tecnico.us_nombre}</option>
                            </select>

                        ))
                    
                    }

                    </div>
          </div>
      </>
    );
}
export default RegistroTHA




