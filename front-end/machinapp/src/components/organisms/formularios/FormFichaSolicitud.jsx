import {
  InputforForm,
  Icons,
  useGlobalData,
  SelectComponent,
  useSolicitudFichasData,
  TextAreaComponent,
  CardStyle,
  V,
  axiosCliente,
} from "../../../index";
import { Image, TableCell, TableRow } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Button,
  Divider,
} from "@nextui-org/react";

export const FormFichaSolicitud = () => {
  const { equiposData } = useGlobalData();
  const { registrarSolicitudFichas } = useSolicitudFichasData();
  const [valuesTable, setvaluesTable] = useState([{ id: 1 }]);

  // permite almacenar un array, para poder pasarsimport Alert from "../feedback/Alert";elo como propiedad a al componente select
  const [equipo, setEquipo] = useState([]);

  // validaciones de los campos de los formularios
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const prioridad = [
    { name: "inmediata", descripcion: "" },
    { name: "urgente", descripcion: "" },
    { name: "normal", descripcion: "" },
  ];

  // enviar datos al servidor
  const handleSubmitData = async (data) => {
    // en estar parte se extrea todos  los datos que tenga fi_placa_sena en el array de entrada
    const placasSena = extraerPlacasSena(data);

    try {
      const res = await axiosCliente.post("solicitud/", {
        prioridad: data.prioridad,
        descripcion: data.Solicitante,
        costo_estimado: "10000",
        obsevaciones: data.obervaciones,
        temaLegal: data.parte_legal,
        nombre_solicitante: data.Solicitante,
        correo_solicitante: data.Correo_de_solicitante,
      });

      let id = res.data.data_id;

      const placasSenaConSolicitud = placasSena.map((obj) => ({
        ...obj,
        fk_solicitud: id,
      }));

      const resfichas = await registrarSolicitudFichas(placasSenaConSolicitud);
      console.log(resfichas);

      if (res && resfichas) {
        alert("se registro con exito la solicitud del mantenimiento");
        reset();
        setvaluesTable([{ id: 1 }]);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // tomar el valor seleccionado de un select en especifico, de la tabla dinamica
  const handleSelectChange = (index, value) => {
    const updatedValues = [...valuesTable];
    updatedValues[index].placaSena = value;
    setvaluesTable(updatedValues);
  };

  const extraerPlacasSena = (data) => {
    const placas = [];

    for (const key in data) {
      // Verifica si la clave empieza con 'fi_placa_sena'
      if (key.startsWith("fi_placa_sena")) {
        // Añade el valor correspondiente al array de placas
        placas.push({ fk_ficha: data[key] });
      }
    }

    return placas;
  };
  const eliminarFila = (id) => {
    setvaluesTable(valuesTable.filter((fila) => fila.id !== id));
  };

  const handleNewEquipos = () => {
    const nuevaFila = {
      id: valuesTable.length + 1,
    };
    setvaluesTable([...valuesTable, nuevaFila]);
  };

  useEffect(() => {
    const equiposInfor = equiposData.map((item) => ({
      id: item.idFichas,
      valor: item.fi_placa_sena,
    }));
    setEquipo(equiposInfor);
  }, [equiposData]);

  return (
    <>
      <div className="flex justify-center  h-full w-full">
        <form
          className="flex flex-col gap-8 w-11/12 pt-12"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="flex flex-row h-24">
            <figure className="flex-shrink-0 h-full w-1/3 border flex justify-center items-center">
              <Image
                src={V.logoSena}
                className="h-20 w-full object-contain"
                alt="logo-sena"
              />
            </figure>
            <div className="flex-grow text-center border px-4 text-base h-full w-1/3 flex items-center justify-center">
              SOLICITUD DE SERVICIO DE MANTENIMIENTO
            </div>
            <div className="flex-shrink-0 w-1/3 h-full border flex items-center">
              <p className="overflow-hidden overflow-ellipsis text-center">
                Centro de Gestión y Desarrollo Sostenible SurColombiano
              </p>
            </div>
          </div>
          <div className="border flex flex-col gap-10 p-14">
            <CardStyle
              titleCard={"Informacion de solicitante"}
              subtitle={"dfsdfdf"}
            >
              <div className="flex gap-10 max-md:inline justify-between">
                <InputforForm
                  errors={errors}
                  name={"Solicitante"}
                  register={register}
                />
                <InputforForm
                  errors={errors}
                  name={"Correo_de_solicitante"}
                  register={register}
                />
                <InputforForm
                  errors={errors}
                  name={"Direccion"}
                  register={register}
                />
              </div>
            </CardStyle>
            <Divider />
            <div className="flex flex-col ">
              Prioridad
              <div className="border-b-4 border-orange-400 inline-block w-24"></div>
              <SelectComponent
                options={prioridad}
                name="prioridad"
                placeholder="Prioridad"
                valueKey="name"
                textKey="name"
                register={register}
                label="Prioridad"
              />
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
              Parte Legal
              <div className="border-b-4 border-orange-400 inline-block w-24"></div>
              <TextAreaComponent
                errors={errors}
                register={register}
                name={"parte_legal"}
              />
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
              Obervaciones
              <div className="border-b-4 border-orange-400 inline-block w-24"></div>
              <TextAreaComponent
                errors={errors}
                register={register}
                name={"obervaciones"}
              />
            </div>
            <Divider />

            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                color={V.btnPrimary}
                onClick={() => handleNewEquipos()}
                radius={V.Bradius}
              >
                <Icons icon={V.PlusIcon} /> Añadir
              </Button>
            </div>
            <div>
              <Table aria-label="Example table with client async pagination">
                <TableHeader>
                  <TableColumn key="name">Equipo</TableColumn>
                  <TableColumn key="height">Placa sena</TableColumn>
                  <TableColumn key="mass">Descripcion del daño</TableColumn>
                  <TableColumn key="birth_year">Actividad</TableColumn>
                  <TableColumn key={"accion"}>Accion</TableColumn>
                </TableHeader>

                <TableBody>
                  {valuesTable.map((fila) => (
                    <TableRow key={fila.id}>
                      <TableCell>
                        <SelectComponent
                          options={equipo}
                          name={`fi_placa_sena_${fila.id}`}
                          placeholder="Equipo"
                          valueKey="id"
                          textKey="valor"
                          register={register}
                          onChange={(val) => handleSelectChange(fila.id, val)}
                          label="Seleccione el Equipo"
                        />
                      </TableCell>
                      <TableCell className="items-center justify-center"></TableCell>
                      <TableCell className="flex items-center ">
                        <TextAreaComponent
                          errors={errors}
                          register={register}
                          name={`obervaciones_${fila.id}`}
                        />
                      </TableCell>
                      <TableCell className="">
                        <TextAreaComponent
                          errors={errors}
                          register={register}
                          name={`actividad_${fila.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          color="danger"
                          isIconOnly
                          onClick={() => eliminarFila(fila.id)}
                        >
                          <Icons icon={V.TrashIcon} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            radius={V.Bradius}
            className={`${V.btnSecundary} mb-6`}
          >
            <span className="text-white font-bold">Registrar</span>
          </Button>
        </form>
      </div>
    </>
  );
};
