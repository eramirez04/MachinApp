import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Input, Divider } from "@nextui-org/react";
import { axiosCliente, SelectComponent,ButtonNext } from "../../../index"; // Asegúrate de importar SelectComponent
import { multiFormData } from "../../../utils/formData.js";

const prioridades = [
  { id: 'inmediata', valor: 'Inmediata' },
  { id: 'urgente', valor: 'Urgente' },
  { id: 'normal', valor: 'Normal' },
];

export const FormSolicitudesUpdate = () => {
  const { id } = useParams(); 
  const [dataSolicitud, setDataSolicitud] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solicitudesResponse = await axiosCliente.get(`/solicitud/listarPorId/${id}`);
        const solicitudData = solicitudesResponse.data;

        setDataSolicitud(solicitudData);


        setValue("prioridad", solicitudData.soli_prioridad || '');
        setValue("descripcion", solicitudData.soli_descripcion_problemas || '');
        setValue("costo_estimado", solicitudData.soli_costo_estimado || '');
        setValue("observaciones", solicitudData.soli_observaciones || '');
        setValue("estado", solicitudData.soli_estado || '');
        setValue("temaLegal", solicitudData.temas_legal || '');
        setValue("nombre_solicitante", solicitudData.nombre_solicitante || '');
        setValue("correo_solicitante", solicitudData.correo_solicitante || '');
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar la solicitud");
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleSubmitData = async (data) => {
    console.log("Enviando información de solicitud:", data);

    const infoSolicitud = {
        prioridad: data.prioridad || '',  
        descripcion: data.descripcion || '',
        costo_estimado: data.costo_estimado || '',
        observaciones: data.observaciones || '',
        temaLegal: data.temaLegal || '',
        nombre_solicitante: data.nombre_solicitante || '',
        correo_solicitante: data.correo_solicitante || ''
    };
    
    try {
        await multiFormData(`/solicitud/actualizar/${id}`, infoSolicitud, "PUT");
        navigate("/solicitud");
        toast.success("Solicitud actualizada con éxito");
    } catch (error) {
        console.error("Error al actualizar:", error.response.data);
        toast.error("Error al actualizar la solicitud");
    }
};


  return (
    <div className="flex justify-center h-full w-full">
      {dataSolicitud ? (
        <form className="flex flex-col gap-8 w-11/12 pt-12" onSubmit={handleSubmit(handleSubmitData)}>
          <div className="border flex flex-col gap-4 p-14">
            <Divider />
            <div className="flex flex-col gap-3">
              <label>Prioridad</label>
              <SelectComponent
                  options={prioridades}
                  name="prioridad"
                  placeholder="Seleccione una prioridad"
                  valueKey="id"
                  textKey="valor"
                  register={register}
                  label="Prioridad"
                  rules={{ required: "Seleccione una prioridad" }} // Asegúrate de tener reglas de validación
              />
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <label>Descripción</label>
              <Input {...register("descripcion", { required: "Describa el problema" })} />
              {errors.descripcion && <span>{errors.descripcion.message}</span>}
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <label>Observaciones</label>
              <Input {...register("observaciones", { required: "Agregue observaciones" })} />
              {errors.observaciones && <span>{errors.observaciones.message}</span>}
            </div>
            <div className="flex flex-col gap-3">
              <label>Tema Legal</label>
              <Input {...register("temaLegal")} />
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <label>Nombre Solicitante</label>
              <Input {...register("nombre_solicitante")} />
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <label>Correo Solicitante</label>
              <Input {...register("correo_solicitante")} />
            </div>
            <Divider />
            <ButtonNext text="Actualizar ficha tecnica"  type="submit" className={"bg-green-600 text-white w-full mt-8"}/>
          </div>
        </form>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default FormSolicitudesUpdate;
