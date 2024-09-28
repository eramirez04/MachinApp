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
  import { useEffect, useState, useCallback } from "react";
  import { useTranslation } from "react-i18next";
  import { toast } from "react-toastify";
  
  import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    Button,
    Divider,
    Input,
  } from "@nextui-org/react";
  
  export const FormSolicitudesUpdate = () => {
    const { equiposData } = useGlobalData();
    const { registrarSolicitudFichas } = useSolicitudFichasData();
    const [valuesTable, setvaluesTable] = useState([{ id: 1 }]);
    const [inputValues, setInputValues] = useState([]);
    const { t } = useTranslation();
  
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
  
      if (placasSena[0].fk_ficha === "") {
        toast.error("seleccione un equipo por lo menos");
        return;
      }
  
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
  
        if (res && resfichas) {
          toast.success("se registro con exito la solicitud del mantenimiento");
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
  
    //
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
  
    // elimina una fila en especifico
    const eliminarFila = (id) => {
      setvaluesTable(valuesTable.filter((fila) => fila.id !== id));
    };
  
    //añade una nueva fila a la tabla, para poder ingresar un nuevo equipo o maquinaria
    const handleNewEquipos = () => {
      if (valuesTable.length >= equiposData.length) {
        toast.warning("llegaste al limite de equipos en el sistema");
        return 0;
      }
  
      const nuevaFila = {
        id: valuesTable[valuesTable.length - 1].id + 1,
      };
      setvaluesTable([...valuesTable, nuevaFila]);
      setInputValues((prevInputValues) => [...prevInputValues, ""]); // Añade un nuevo input vacío
    };
  
    const handleInputChange = (index, value) => {
      value = Number(value);
      const newInputValues = [...inputValues];
      newInputValues[index] = value;888
      setInputValues(newInputValues);
    };
  
    const handlesuma = useCallback(() => {
      return inputValues.reduce((a, b) => a + b, 0);
    }, [inputValues]);
  
    useEffect(() => {
      const equiposInfor = equiposData.map((item) => ({
        id: item.idFichas,
        valor: item.fi_placa_sena,
      }));
      setEquipo(equiposInfor);
      /*     console.log(valuesTable);
      handlesuma(); */
    }, [equiposData, handlesuma, valuesTable]);
  
    return (
      <>
        <div className="flex justify-center h-full w-full">
          <form
            className="flex flex-col gap-8 w-11/12 pt-12"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <div className="flex flex-row h-20">
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
            <div className="border flex flex-col gap-4 p-14">

              <Divider />
              <div className="flex flex-col gap-3">
                Prioridad
                <div className=" border-orange-400 inline-block w-24"></div>
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
              <div className="flex flex-col gap-3">
                Descripcion de la solicitud
                <div className="border-b-4 border-orange-400 inline-block w-24"></div>
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={"descripcion"}
                  label={t("descripcion")}
                />
              </div>
              <Divider />
              <div className="flex flex-col gap-3">
                Parte Legal
                <div className="border-b-4 border-orange-400 inline-block w-24"></div>
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={"parte_legal"}
                  label={"Temas legales"}
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
                  label={"Observaciones"}
                />
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  costos
                  <div className="border-b-4 border-orange-400 inline-block w-24"></div>
                  <span className="font-semibold">
                    Precio Total de las reparaciones y de mantenimientos
                  </span>
                </div>
                <div className="flex justify-center items-center h-full">
                  <Input value={handlesuma()} />
                </div>
              </div>{" "}
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
                <Table
                  aria-label="Example table with client async pagination"
                  className="bg-red"
                >
                  <TableHeader>
                    <TableColumn
                      key="name"
                      className={`${V.bg_sena_verde} ${V.text_white}`}
                    >
                      Equipo
                    </TableColumn>
                    <TableColumn
                      key="height"
                      className={`${V.bg_sena_verde} ${V.text_white}`}
                    >
                      Placa sena
                    </TableColumn>
                    <TableColumn
                      key="mass"
                      className={`${V.bg_sena_verde} ${V.text_white}`}
                    >
                      Descripcion del daño
                    </TableColumn>
                    <TableColumn
                      key="birth_year"
                      className={`${V.bg_sena_verde} ${V.text_white}`}
                    >
                      Actividad
                    </TableColumn>
                    <TableColumn
                      key={"accion"}
                      className={`${V.bg_sena_verde} ${V.text_white}`}
                    >
                      Accion
                    </TableColumn>
                  </TableHeader>
  
                  <TableBody>
                    {valuesTable.map((fila, index) => (
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
                        <TableCell className="items-center justify-center">
                          <Input
                            type="number"
                            id={`input$${index}`}
                            size="sm"
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                          />
                        </TableCell>
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
              <span className="text-white font-bold">{t("Actualizar")}</span>
            </Button>
          </form>
        </div>
      </>
    );
  };
  