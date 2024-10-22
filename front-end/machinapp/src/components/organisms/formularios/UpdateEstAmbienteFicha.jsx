import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Listbox, ListboxItem, Button } from "@nextui-org/react";

import { axiosCliente } from "../../../service/api/axios"

import { SelectComponent, useGlobalData  } from "../../../index.js"


import { useTranslation } from "react-i18next"

export const UpdateEstAmbienteFicha = ({ dataMaquina, procesoAct, buscarInfo }) => {

  const { refreshEquipos } = useGlobalData();
  
  const { register, setValue, handleSubmit, reset } = useForm()

  const dataFicha = dataMaquina

  const { t } = useTranslation()

  const [modal, setModal] = useState(false) // para manejar el estado del modal
  const [ambientes, setAmbientes] = useState([]) // para el select de ambientes
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([`${dataFicha.fi_estado}`])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  // Actualiza el valor del formulario solo si el proceso es "EstadoFicha"
  useEffect(() => {
    if (procesoAct === "EstadoFicha") {
      setValue("fiEstado", selectedValue)
    }
  }, [selectedValue, setValue, procesoAct])

  const onSubmit = async (data) => {
    try {
      await axiosCliente.patch(`ficha/actualizarFichaEsp/${dataFicha.idFichas}`, data)

      await refreshEquipos()
      setModal(true) // con esto manejamos el botón y el mensaje de actualización 
      buscarInfo() // para recargar la página de infoMaquina
      reset() // resetear el formulario
      setSelectedKeys(new Set())
    } catch (error) {
      console.error(error.response)
    }
  }

  useEffect(() => {
    const fechtData = async () => {
      try {
        const [ambientesRes] = await Promise.all([axiosCliente.get("sitio/listarsitio")])



        const ambientesArray = ambientesRes.data.resultadoSitio.map((item) => ({
          id: item.idAmbientes,
          valor: item.sit_nombre,
        }))

        setAmbientes(ambientesArray)
      } catch (error) {
        console.error(error.response)
      }
    }
    fechtData()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {procesoAct === "AmbienteFicha" ? (
          <div>
            <SelectComponent
              options={ambientes}
              name="fk_sitio"
              placeholder={t('ambiente')}
              valueKey="id"
              textKey="valor"
              register={register}
              label={t('ambiente')}
            />
            </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              >
                <ListboxItem key="operacion" color="success">
                  {t('operacion')}
                </ListboxItem>
                <ListboxItem key="en_reparacion" color="warning">
                  {t('reparasion')}
                </ListboxItem>
                <ListboxItem key="fuera_de_servicio" color="danger">
                  {t('fueraServicio')}
                </ListboxItem>
              </Listbox>
            </div>
            {procesoAct === "EstadoFicha" && (
              <input type="hidden" {...register("fiEstado")} />
            )}
          </div>
        )}

        {!modal && (
          <Button className="mt-6 text-white" type="submit" color="success">
            {t('aceptar')}
          </Button>
        )}
        {modal ? <p className="mt-5"> {t('actCorrectamente')}</p> : <p></p>}
      </form>
    </>
  );
};