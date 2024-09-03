import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { axiosCliente } from '../../../service/api/axios';
import { CardStyle } from "../../molecules/content/CardStyle.jsx";
import {InputforForm} from "../../molecules/form/InputForForm";
import { Image, Button, Radio, RadioGroup, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Textarea = ({ register, name, placeholder, rows }) => (
  <textarea
    {...register(name)}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-2 border rounded"
  />
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Se detectó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal. Intente actualizar la página.</h1>;
    }

    return this.props.children;
  }
}

export const FormFichaDeMantenimiento = () => {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      mant_codigo_mantenimiento: '',
      mant_estado: '',
      mant_fecha_proxima: '',
      mant_descripcion: '',
      mant_ficha_soporte: null,
      costo_final: '',
      fk_tipo_mantenimiento: '',
      fk_solicitud_mantenimiento: '',
      repuestos: [{ nombreRepuesto: '', costo: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "repuestos"
  });

  const [tiposMantenimiento, setTiposMantenimiento] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tiposMantenimientoRes = await axiosCliente.get('tipomantenimiento/listar');
        setTiposMantenimiento(tiposMantenimientoRes.data || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("Error al cargar los datos. Por favor, intente de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Registro del mantenimiento
      const formData = new FormData();
      formData.append('mant_codigo_mantenimiento', data.mant_codigo_mantenimiento);
      formData.append('mant_estado', data.mant_estado);
      formData.append('mant_fecha_proxima', data.mant_fecha_proxima);
      formData.append('mant_descripcion', data.mant_descripcion);
      if (selectedFile) {
        formData.append('mant_ficha_soporte', selectedFile);
      }
      formData.append('mant_costo_final', data.costo_final);
      formData.append('fk_tipo_mantenimiento', data.fk_tipo_mantenimiento);
      formData.append('fk_solicitud_mantenimiento', data.fk_solicitud_mantenimiento);

      /* console.log("Envío de datos de mantenimiento:", Object.fromEntries(formData)); */

      const mantenimientoResponse = await axiosCliente.post('mantenimiento/registrar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      /* console.log("Respuesta de registro de mantenimiento:", mantenimientoResponse.data); */

      const mantenimientoId = mantenimientoResponse.data.idMantenimiento;

      if (!mantenimientoId) {
        throw new Error("No se recibió el ID del mantenimiento en la respuesta");
      }

      // Registro de partes de mantenimiento
      const partesMantenimiento = data.repuestos.map(repuesto => ({
        par_fk_mantenimientos: mantenimientoId,
        par_nombre_repuesto: repuesto.nombreRepuesto,
        par_costo: repuesto.costo
      }));

      /* console.log("Envío de datos de piezas:", partesMantenimiento);
      console.log(partesMantenimiento) */

      const partesResponse = await axiosCliente.post('partes_mantenimiento/registrar', partesMantenimiento);

      /* console.log("Respuesta de registro de piezas:", partesResponse.data); */

      // Alerta de éxito
      alert("Todo registrado con éxito.");

      reset(); 
      setSelectedFile(null); 
    } catch (error) {
      console.error("Error registrando mantenimiento y partes:", error);
      let errorMessage = "Error al registrar el mantenimiento y partes. ";
      if (error.response) {
        errorMessage += `Error del servidor: ${error.response.status} - ${error.response.data.message || error.response.statusText}`;
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        errorMessage += "No se recibió respuesta del servidor.";
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto flex flex-col gap-6 p-4">
        <div className="flex items-center justify-between mb-4 border p-2">
          <div className="w-1/4">
            <Image
              src="/logoSenaNaranja.png"
              className="h-16 w-full object-contain"
              alt="logo-sena"
            />
          </div>
          <div className="w-1/2 text-center">
            <h2 className="text-sm font-bold">SUBSISTEMA DE MANTENIMIENTO Y CONTROL DE MAQUINARIA Y EQUIPO ORDEN DE TRABAJO DE MANTENIMIENTO</h2>
          </div>
          <div className="w-1/4 text-right">
            <p className="text-xs">Centro de gestión y desarrollo sostenible surColombiano</p>
          </div>
        </div>

        <CardStyle titleCard="Código de Mantenimiento">
          <InputforForm
            register={register}
            errors={errors}
            name="mant_codigo_mantenimiento"
            tipo="text"
            placeholder="Ingrese el código de mantenimiento"
          />
        </CardStyle>

        <CardStyle titleCard="Estado">
          <InputforForm
            register={register}
            errors={errors}
            name="mant_estado"
            tipo="text"
            placeholder="Ingrese el estado"
          />
        </CardStyle>

        <CardStyle titleCard="Fecha Próxima">
          <InputforForm
            register={register}
            errors={errors}
            name="mant_fecha_proxima"
            tipo="date"
            placeholder="Seleccione la fecha próxima"
          />
        </CardStyle>

        <CardStyle titleCard="Tipo de Mantenimiento">
          <Controller
            name="fk_tipo_mantenimiento"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                {tiposMantenimiento && tiposMantenimiento.length > 0 ? (
                  tiposMantenimiento.map((tipo) => (
                    <Radio key={tipo.idTipo_mantenimiento} value={tipo.idTipo_mantenimiento.toString()}>
                      {tipo.tipo_mantenimiento || 'Sin tipo de mantenimiento'}
                    </Radio>
                  ))
                ) : (
                  <p>No hay tipos de mantenimiento disponibles</p>
                )}
              </RadioGroup>
            )}
          />
        </CardStyle>

        <CardStyle titleCard="Descripción del Mantenimiento">
          <Textarea
            register={register}
            name="mant_descripcion"
            placeholder="Proporcione una descripción detallada del mantenimiento realizado."
            rows={6}
          />
        </CardStyle>

        <CardStyle titleCard="Trabajo Ejecutado">
          <input type="file" onChange={handleFileChange} />
          {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
        </CardStyle>

        <CardStyle titleCard="Costo Final">
          <InputforForm
            register={register}
            errors={errors}
            name="costo_final"
            tipo="number"
            placeholder="Ingrese el costo final"
          />
        </CardStyle>

        <CardStyle titleCard="Solicitud de Mantenimiento">
          <InputforForm
            register={register}
            errors={errors}
            name="fk_solicitud_mantenimiento"
            tipo="text"
            placeholder="Ingrese la solicitud de mantenimiento"
          />
        </CardStyle>

        <CardStyle titleCard="Repuestos utilizados y costos">
          <div className="flex justify-end mb-2">
            <Button
              color="primary"
              onClick={() => append({ nombreRepuesto: '', costo: '' })}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Agregar repuesto
            </Button>
          </div>
          <Table aria-label="Tabla de repuestos">
            <TableHeader>
              <TableColumn>Nombre del repuesto</TableColumn>
              <TableColumn>Costo</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <InputforForm
                      register={register}
                      errors={errors}
                      name={`repuestos.${index}.nombreRepuesto`}
                      tipo="text"
                      placeholder="Nombre del repuesto"
                    />
                  </TableCell>
                  <TableCell>
                    <InputforForm
                      register={register}
                      errors={errors}
                      name={`repuestos.${index}.costo`}
                      tipo="number"
                      placeholder="Costo"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardStyle>

        <Button
          type="submit"
          color="success"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrar Mantenimiento"}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </ErrorBoundary>
  );
};
