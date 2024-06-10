import React,{useState} from "react"
import api from "../atoms/api/Api.jsx"
import { useNavigate } from "react-router-dom"
import ButtonRegistroActividades from './ButtonRegistroActividades';

const RegistrarActividades=()=>{

    const [acti_nombre,setNombre]=useState('');
    const [acti_descripcion,setDescripcion]=useState('');
    const [acti_fecha_realizacion,setFecha]=useState('');
    const [acti_estado,setEstado]=useState('');
    const [fk_mantenimiento,setMantenimiento]=useState('');
    const navigate=useNavigate()

    const handleCreateTask=async(e)=>{
        e.preventDefault()
        if((acti_nombre==='')||(acti_descripcion==='')||(acti_fecha_realizacion==='')||(acti_estado==='')||(fk_mantenimiento==='')){
            alert('llenar todos los campos campos')
        }else{
            try {
                const result=await api.post('/registrar',{
                    acti_nombre:acti_nombre,
                    acti_descripcion:acti_descripcion,
                    acti_fecha_realizacion:acti_fecha_realizacion,
                    acti_estado:acti_estado,
                    fk_mantenimiento:fk_mantenimiento,
                }).finally(()=>{
                    navigate("/")
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

        
    }

    return (
      <>
  
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input type="text" value={acti_nombre}  onChange={(e)=>setFecha(e.target.value)}/>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Estado</span>
                      <input type="email" placeholder="email" className="input input-bordered" value={acti_estado} />
                    </label>
                    
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Descripcion</span>
                      
                    </label>
                    <textarea className="textarea textarea-bordered" value={acti_descripcion} required />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Mantenimiento</span>
                      
                    </label>
                    <input type="email" className="input input-bordered" value={fk_mantenimiento} required />
                  </div>
                  <div onClick={handleCreateTask}>
                    <ButtonRegistroActividades/>
                  </div>
                    
                </form>
              </div>
            </div>
      </>
    );
}
export default RegistrarActividades