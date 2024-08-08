import React from 'react';
import { useForm } from 'react-hook-form';
import { CardStyle } from "../../molecules/CardStyle.jsx";
import InputforForm from "../../molecules/InputForForm";
import { SelectComponent } from "../../molecules/SelectComponent.jsx";
import { Image } from "@nextui-org/react";

// Simple Textarea component
const Textarea = ({ register, name, placeholder, rows }) => (
  <textarea
    {...register(name)}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2 border rounded"
  />
);

export const FormFichaDeMantenimiento = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      date: '',
      regional: '',
      sede_de_formacion : '',
      Unidad_productiva: '',
      maintenanceType: '',
      priority: '',
      description: '',
      maintenanceDetails: '',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4 border p-2">
        <div className="w-1/4">
            <Image
              src="logoSenaNaranja.png"
              className="h-16 w-full object-contain"
              alt="logo-sena"
            />
        </div>
        <div className="w-1/2 text-center">
          <h2 className="text-sm font-bold">SUBSISTEMA DE MANTENIMIENTO Y CONTROL DE MAQUINARIA Y EQUIPO ORDEN DE TRABAJO DE MANTENIMIENTO</h2>
        </div>
        <div className="w-1/4 text-right">
          <p className="text-xs">Fecha: <input type="date" {...register('date')} /></p>
          <p className="text-xs">Centro de gestión y desarrollo sostenible surColombiano</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <InputforForm
          register={register}
          errors={errors}
          name="Regional"
          tipo="text"
        />
        <InputforForm
          register={register}
          errors={errors}
          name="Sede de formacion "
          tipo="text"
        />
        <InputforForm
          register={register}
          errors={errors}
          name="Unidades productivas"
          tipo="text"
        />
        <InputforForm
          register={register}
          errors={errors}
          name="Aula o taller"
          tipo="text"
        />
      </div>
      <CardStyle titleCard="Datos del equipo o maquina">
        <Textarea
          register={register}
          name="description"
          placeholder="Descripción"
          rows={4}
        />
      </CardStyle>
      <CardStyle titleCard="Tipo de Reparacion">
        <SelectComponent
          register={register}
          name="Tipo_de_Reparacion"
          options={[
            { valor: 'preventivo', text: 'preventivo' },
            { valor: 'correctivo', text: 'correctivo' }
          ]}
          placeholder="Seleccione el tipo de mantenimiento"
        />
      </CardStyle>
      <CardStyle titleCard="Prioridad">
        <SelectComponent
          register={register}
          name="priority"
          options={[
            { valor: 'immediate', text: 'Inmediata' },
            { valor: 'urgent', text: 'Urgente' },
            { valor: 'normal', text: 'Normal' }
          ]}
          placeholder="Seleccione la prioridad"
        />
      </CardStyle>

      <CardStyle titleCard="Trabajo ejecutado">
        <Textarea
          register={register}
          name="description"
          placeholder="Descripción"
          rows={4}
        />
      </CardStyle>

      <CardStyle titleCard="Descripción del mantenimiento">
        <Textarea
          register={register}
          name="maintenanceDetails"
          placeholder="Detalles del mantenimiento"
          rows={4}
        />
      </CardStyle>

      <CardStyle titleCard="Repuestos utilizados y costos">
        <div className="grid grid-cols-3 gap-4">
          <InputforForm register={register} errors={errors} name="Descripción" tipo="text" placeholder="Descripción" />
          <InputforForm register={register} errors={errors} name="Nombre repuesto" tipo="text" placeholder="Nombre repuesto" />
          <InputforForm register={register} errors={errors} name="Costo" tipo="number" placeholder="Costo" />
        </div>
      </CardStyle>

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Subir</button>
    </form>
  );
};