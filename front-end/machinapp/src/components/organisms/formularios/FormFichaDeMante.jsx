import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {axiosCliente} from '../../../service/api/axios';
import { CardStyle } from "../../molecules/CardStyle.jsx";
import InputforForm from "../../molecules/InputForForm";
import { SelectComponent } from "../../molecules/SelectComponent.jsx";
import { Image, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, Radio, RadioGroup } from "@nextui-org/react";
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
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>;
    }

    return this.props.children;
  }
}

export const FormFichaDeMantenimiento = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      date: '',
      sede: '',
      area: '',
      ambiente: '',
      maintenanceType: '',
      priority: '',
      description: '',
      maintenanceDetails: '',
      repuestos: [{ descripcion: '', nombreRepuesto: '', costo: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "repuestos"
  });

  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [tiposMantenimiento, setTiposMantenimiento] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [sedesRes, areasRes, ambientesRes, tiposMantenimientoRes] = await Promise.all([
          axiosCliente.get('http://localhost:3000/sede/listarsede'),
          axiosCliente.get('http://localhost:3000/area/listararea'),
          axiosCliente.get('http://localhost:3000/sitio/listarsitio'),
          axiosCliente.get('http://localhost:3000/tipomantenimiento/listar')
        ]);

/*         console.log("Datos recibidos:", {
          sedes: sedesRes.data,
          areas: areasRes.data,
          ambientes: ambientesRes.data,
          tiposMantenimiento: tiposMantenimientoRes.data
        }); */

        setSedes(sedesRes.data.resultadoSede || []);
        setAreas(areasRes.data.resultadoArea || []);
        setAmbientes(ambientesRes.data.resultadoSitio || []);
        setTiposMantenimiento(tiposMantenimientoRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos. Por favor, intente de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    //ira la lógica para enviar los datos al servidor
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const prioridades = [
    { name: "inmediata", descripcion: "Inmediata" },
    { name: "urgente", descripcion: "Urgente" },
    { name: "normal", descripcion: "Normal" },
  ];

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto flex flex-col gap-10 p-4">
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
            <p className="text-xs">Fecha: <input type="date" {...register('date')} /></p>
            <p className="text-xs">Centro de gestión y desarrollo sostenible surColombiano</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <SelectComponent
            register={register}
            name="sede"
            options={sedes.map(sede => ({ valor: sede.idSede, text: sede.sede_nombre }))}
            placeholder="Seleccione la sede"
            className="text-black"
            valueKey="valor"
            textKey="text"
          />
          <SelectComponent
            register={register}
            name="area"
            options={areas.map(area => ({ valor: area.idArea, text: area.area_nombre }))}
            placeholder="Seleccione el área"
            className="text-black"
            valueKey="valor"
            textKey="text"
          />
          <SelectComponent
            register={register}
            name="ambiente"
            options={ambientes.map(ambiente => ({ valor: ambiente.idAmbientes, text: ambiente.sit_nombre }))}
            placeholder="Seleccione el ambiente"
            className="text-black"
            valueKey="valor"
            textKey="text"
          />
        </div>

        <CardStyle titleCard="Datos del equipo o máquina" >
          <Textarea
            register={register}
            name="description"
            placeholder="Ingrese una descripción detallada del equipo o máquina, incluyendo modelo, marca, número de serie y cualquier otra información relevante."
            rows={6}
          />
        </CardStyle>

        <CardStyle titleCard="Tipo de Mantenimiento" >
          <Controller
            name="maintenanceType"
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

        <CardStyle titleCard="Prioridad" className="mb-10">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                {prioridades.map((prioridad) => (
                  <Radio key={prioridad.name} value={prioridad.name}>
                    {prioridad.descripcion}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </CardStyle>

        <CardStyle titleCard="Trabajo ejecutado">
          <input type="file" onChange={handleFileChange} />
          {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
        </CardStyle>

        <CardStyle titleCard="Descripción del mantenimiento">
          <Textarea
            register={register}
            name="maintenanceDetails"
            placeholder="Proporcione una descripción detallada del mantenimiento realizado, incluyendo las tareas específicas, los problemas encontrados, las soluciones aplicadas y cualquier observación relevante."
            rows={6}
          />
        </CardStyle>

        <CardStyle titleCard="Repuestos utilizados y costos" >
          <div className="flex justify-end mb-2">
            <Button
              color="primary"
              onClick={() => append({ descripcion: '', nombreRepuesto: '', costo: '' })}
            >
              <PlusIcon /> Añadir
            </Button>
          </div>

          <Table aria-label="Tabla de repuestos">
            <TableHeader>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Costo</TableColumn>
              <TableColumn>Acción</TableColumn>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <InputforForm
                      register={register}
                      errors={errors}
                      name={`${index}.descripcion`}
                      tipo="text"
                      placeholder="Descripción"
                    />
                  </TableCell>
                  <TableCell>
                    <InputforForm
                      register={register}
                      errors={errors}
                      name={`${index}.nombreRepuesto`}
                      tipo="text"
                      placeholder="Nombre del repuesto"
                    />
                  </TableCell>
                  <TableCell>
                    <InputforForm
                      register={register}
                      errors={errors}
                      name={`${index}.costo`}
                      tipo="number"
                      placeholder="Costo"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon /> Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardStyle>
        <Button type="submit" color="primary" className="mt-4">Enviar</Button>
      </form>
    </ErrorBoundary>
  );
};
