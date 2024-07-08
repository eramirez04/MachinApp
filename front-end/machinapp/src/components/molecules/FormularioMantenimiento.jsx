import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../Api.jsx";
import Alerta from "../atoms/Alerta.jsx";
import Boton from "../atoms/Boton.jsx";
import CampoTexto from "../atoms/CampoTexto.jsx";
import Etiqueta from "../atoms/Etiqueta.jsx";
import Fecha from "../atoms/Fecha.jsx";

const FormularioMantenimiento = () => {
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
        } catch (error) {
            console.error(error);
            setMensaje('Hubo un problema al registrar el mantenimiento. ' + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto pt-3">
            {mensaje && <Alerta descripcion={mensaje} />}
            <form onSubmit={handleSubmit(handleRegistroMantenimiento)}>
                <div className="mb-4">
                    <Etiqueta htmlFor="mantCodigoMantenimiento" texto="Código de Mantenimiento" clase="block text-sm font-medium text-gray-700" />
                    <CampoTexto 
                        id="mantCodigoMantenimiento" 
                        valor={mantCodigoMantenimiento} 
                        onChange={(e) => setMantCodigoMantenimiento(e.target.value)} 
                        clase="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.mantCodigoMantenimiento && <Alerta descripcion="Código de Mantenimiento requerido" />}
                </div>

                <div className="mb-4">
                    <Etiqueta htmlFor="mantFechaRealizacion" texto="Fecha de Realización" clase="block text-sm font-medium text-gray-700" />
                    <Fecha 
                        id="mantFechaRealizacion" 
                        valor={mantFechaRealizacion} 
                        onChange={(e) => setMantFechaRealizacion(e.target.value)} 
                        clase="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.mantFechaRealizacion && <Alerta descripcion="Fecha de Realización requerida" />}
                </div>

                <div className="mb-4">
                    <Etiqueta htmlFor="mantFechaProxima" texto="Fecha Próxima" clase="block text-sm font-medium text-gray-700" />
                    <Fecha 
                        id="mantFechaProxima" 
                        valor={mantFechaProxima} 
                        onChange={(e) => setMantFechaProxima(e.target.value)} 
                        clase="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.mantFechaProxima && <Alerta descripcion="Fecha Próxima requerida" />}
                </div>

                <div className="mb-4">
                    <Etiqueta htmlFor="mantDescripcion" texto="Descripción" clase="block text-sm font-medium text-gray-700" />
                    <textarea 
                        id="mantDescripcion" 
                        {...register("mantDescripcion", { required: true })} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                        onChange={(e) => setMantDescripcion(e.target.value)}
                    ></textarea>
                    {errors.mantDescripcion && <Alerta descripcion="Descripción requerida" />}
                </div>

                <div className="mb-4">
                    <Etiqueta htmlFor="mantFkFichas" texto="ID de Fichas" clase="block text-sm font-medium text-gray-700" />
                    <CampoTexto 
                        id="mantFkFichas" 
                        tipo="number" 
                        valor={mantFkFichas} 
                        onChange={(e) => setMantFkFichas(e.target.value)} 
                        clase="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.mantFkFichas && <Alerta descripcion="ID de Fichas requerido" />}
                </div>

                <div className="mb-4">
                    <Etiqueta htmlFor="fkTipoMantenimiento" texto="ID del Tipo de Mantenimiento" clase="block text-sm font-medium text-gray-700" />
                    <CampoTexto 
                        id="fkTipoMantenimiento" 
                        tipo="number" 
                        valor={fkTipoMantenimiento} 
                        onChange={(e) => setFkTipoMantenimiento(e.target.value)} 
                        clase="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.fkTipoMantenimiento && <Alerta descripcion="ID del Tipo de Mantenimiento requerido" />}
                </div>

                <Boton 
                    texto="Registrar Mantenimiento" 
                    tipo="submit" 
                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 inline-block w-full"
                />
            </form>
        </div>
    );
}

export default FormularioMantenimiento;
