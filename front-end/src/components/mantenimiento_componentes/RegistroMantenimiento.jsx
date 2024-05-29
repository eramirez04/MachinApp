import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../Api.jsx";
import Alert from "../Alert.jsx";
import InputSubmit from "../InputSubmit.jsx";

const RegistroMantenimientos = () => {
    const [mantCodigoMantenimiento, setMantCodigoMantenimiento] = useState('');
    const [mantFechaRealizacion, setMantFechaRealizacion] = useState('');
    const [mantFechaProxima, setMantFechaProxima] = useState('');
    const [mantDescripcion, setMantDescripcion] = useState('');
    const [mantFkFichas, setMantFkFichas] = useState('');
    const [fkTipoMantenimiento, setFkTipoMantenimiento] = useState('');
    const [mensaje, setMensaje] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();

    const handleRegistroMantenimiento = async () => {
        try {
            await api.post('http://localhost:3000/mantenimiento/Registrar_Mantenimiento', {
                mant_codigo_mantenimiento: mantCodigoMantenimiento,
                mant_fecha_realizacion: mantFechaRealizacion,
                mant_fecha_proxima: mantFechaProxima,
                mant_descripcion: mantDescripcion,
                mant_fk_fichas: mantFkFichas,
                fk_tipo_mantenimiento: fkTipoMantenimiento,
                mant_ficha_soporte: ''
            });
            setMensaje('El mantenimiento se registró correctamente.');
            // Redirigir a otra página o mostrar mensaje de éxito
        } catch (error) {
            console.error(error);
            setMensaje('Hubo un problema al registrar el mantenimiento. ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto pt-3">
            {mensaje && <Alert descripcion={mensaje} />}
            <form onSubmit={handleSubmit(handleRegistroMantenimiento)}>
                <div className="mb-4">
                    <label htmlFor="mantCodigoMantenimiento" className="block text-sm font-medium text-gray-700">Código de Mantenimiento</label>
                    <input
                        type="text"
                        id="mantCodigoMantenimiento"
                        {...register("mantCodigoMantenimiento", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setMantCodigoMantenimiento(e.target.value)}
                    />
                    {errors.mantCodigoMantenimiento && <Alert descripcion="Código de Mantenimiento requerido" />}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="mantFechaRealizacion" className="block text-sm font-medium text-gray-700">Fecha de Realización</label>
                    <input
                        type="date"
                        id="mantFechaRealizacion"
                        {...register("mantFechaRealizacion", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setMantFechaRealizacion(e.target.value)}
                    />
                    {errors.mantFechaRealizacion && <Alert descripcion="Fecha de Realización requerida" />}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="mantFechaProxima" className="block text-sm font-medium text-gray-700">Fecha Próxima</label>
                    <input
                        type="date"
                        id="mantFechaProxima"
                        {...register("mantFechaProxima", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setMantFechaProxima(e.target.value)}
                    />
                    {errors.mantFechaProxima && <Alert descripcion="Fecha Próxima requerida" />}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="mantDescripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="mantDescripcion"
                        {...register("mantDescripcion", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setMantDescripcion(e.target.value)}
                    ></textarea>
                    {errors.mantDescripcion && <Alert descripcion="Descripción requerida" />}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="mantFkFichas" className="block text-sm font-medium text-gray-700">ID de Fichas</label>
                    <input
                        type="number"
                        id="mantFkFichas"
                        {...register("mantFkFichas", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setMantFkFichas(e.target.value)}
                    />
                    {errors.mantFkFichas && <Alert descripcion="ID de Fichas requerido" />}
                </div>
    
                <div className="mb-4">
                    <label htmlFor="fkTipoMantenimiento" className="block text-sm font-medium text-gray-700">ID del Tipo de Mantenimiento</label>
                    <input
                        type="number"
                        id="fkTipoMantenimiento"
                        {...register("fkTipoMantenimiento", { required: true })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setFkTipoMantenimiento(e.target.value)}
                    />
                    {errors.fkTipoMantenimiento && <Alert descripcion="ID del Tipo de Mantenimiento requerido" />}
                </div>
    
                <InputSubmit value="Registrar Mantenimiento" />
            </form>
        </div>
    );
    
}

export default RegistroMantenimientos;
