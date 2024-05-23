import React,{useState} from "react"
import api from "../Api"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import ButtonRegistroActividades from './ButtonRegistroActividades';
import Alert from "../Alert.jsx";

const RegistrarActividades=()=>{

    const [acti_nombre,setNombre]=useState('');
    const [acti_descripcion,setDescripcion]=useState('');
    const [acti_fecha_realizacion,setFecha]=useState('');
    const [acti_estado,setEstado]=useState('');
    const [fk_mantenimiento,setMantenimiento]=useState('');

    const {register, formState: {errors}, handleSubmit} = useForm()


    const navigate=useNavigate()

    const handleCreateTask=async(e)=>{
       

            try {
                const result=await api.post('actividades/registrar',{
                    acti_nombre:acti_nombre,
                    acti_descripcion:acti_descripcion,
                    acti_fecha_realizacion:acti_fecha_realizacion,
                    acti_estado:acti_estado,
                    fk_mantenimiento:fk_mantenimiento,
                }).finally(()=>{
                    navigate("/Home")
                })
                console.log('Tarea creada',result.data)
                setNombre('')
                setDescripcion('')
                setFecha('')
                setEstado('')
                setMantenimiento('')
            } catch (error) {
                console.error('error al crear la actividad',error)
            }
        

        
    }

    return (
      <>
      <div className="max-w-md mx-auto">

              <form onSubmit={handleSubmit(handleCreateTask)}>
                    <h1 className=" text-2xl pb-3">Registro</h1>
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
                          Nombres
                      </label>
                      {
                          errors.nombres?.type === "required" && (
                              <Alert descripcion="Nombre requirido"/>
                          )
                      }
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="floating_email" id="floating_email"
                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                             placeholder=" "
                             value={acti_descripcion}
                             {...register("descripcion", {required: true})}
                             onChange={(e) => setDescripcion(e.target.value)}

                      />
                      <label htmlFor="floating_email"
                             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          descripcion
                      </label>
                      {
                          errors.descripcion?.type === "required" && (
                              <Alert descripcion="descripcion requiridos"/>
                          )
                      }
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                      <input type="date" name="floating_email" id="floating_email"
                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                             placeholder=" "
                             {...register("correo", {required: true,})}
                             value={acti_fecha_realizacion}
                             onChange={(e) => setFecha(e.target.value)}
                      />
                      <label htmlFor="floating_email"
                             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          fecha
                      </label>
                      {
                          errors.numero?.type === "required" && (
                              <Alert descripcion="fecha requirida"/>
                          )
                      }
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="floating_email" id="floating_email"
                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                             placeholder=" "
                             {...register("numero", {required: true,})}
                             value={acti_estado}
                             onChange={(e) => setEstado(e.target.value)}
                      />
                      <label htmlFor="floating_email"
                             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          estado
                      </label>
                      {
                          errors.numero?.type === "required" && (
                              <Alert descripcion="estado requirido"/>
                          )
                      }
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                      <input type="number" name="floating_email" id="floating_email"
                             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                             placeholder=" "
                             {...register("password", {required: true,})}
                             value={fk_mantenimiento}
                             onChange={(e) => setMantenimiento(e.target.value)}
                      />
                      <label htmlFor="floating_email"
                             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          mantenimiento
                      </label>
                      {
                          errors.numero?.type === "required" && (
                              <Alert descripcion="mantenimiento requirido"/>
                          )
                      }
                  </div>
                  <ButtonRegistroActividades value="Registrarse"/>
              </form>
          </div>
      </>
    );
}
export default RegistrarActividades