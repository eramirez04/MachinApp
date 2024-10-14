import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Image } from "@nextui-org/react";
import { toast } from 'react-toastify';

import { V, CardStyle, InputUpdate, axiosCliente, TextAreaComponent, SelectComponent, ButtonNext } from "../../../index.js";

export const FormSolicitudesUpdate = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      prioridad: '',
      soli_descripcion_problemas: '',
      soli_costo_estimado: '',
      soli_observaciones: '',
      temas_legal: '',
      nombre_solicitante: '',
      correo_solicitante: '',
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const solicitudesResponse = await axiosCliente.get(`/solicitud/listarPorId/${id}`);
        const solicitudData = solicitudesResponse.data;

        reset({
          prioridad: solicitudData.soli_prioridad || '',
          soli_descripcion_problemas: solicitudData.soli_descripcion_problemas || '',
          soli_costo_estimado: solicitudData.soli_costo_estimado || '',
          soli_observaciones: solicitudData.soli_observaciones || '',
          temas_legal: solicitudData.temas_legal || '',
          nombre_solicitante: solicitudData.nombre_solicitante || '',
          correo_solicitante: solicitudData.correo_solicitante || '',
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(t("error_loading_request"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, reset, t]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      await axiosCliente.put(`/solicitud/actualizar/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success(t("update_success"));
      navigate('/solicitud');
    } catch (error) {
      console.error("Error updating request:", error);
      setError(t("update_error"));
      toast.error(t("update_error"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-8 w-11/12 pt-12">
      <div className="flex flex-row h-20">
            <figure className="flex-shrink-0 h-full w-1/3 border flex justify-center items-center">
              <Image
                src={V.logoSena}
                className="h-20 w-full object-contain"
                alt="logo-sena"
              />
            </figure>
            <div className="flex-grow text-center border px-4 text-base h-full w-1/3 flex items-center justify-center">
            {t("maintenance_service_request")}
            </div>
            <div className="flex-shrink-0 w-1/3 h-full border flex items-center">
              <p className="overflow-hidden overflow-ellipsis text-center">
                {t("management_center")}
              </p>
            </div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
          <CardStyle titleCard={t("applicant_information")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="nombre_solicitante"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputUpdate
                  {...field}
                  label={t("name_of_applicant")}
                  tipo="text"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
            <Controller
              name="correo_solicitante"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputUpdate
                  {...field}
                  label={t("applicants_email")}
                  tipo="email"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
          </CardStyle>
          
          <CardStyle titleCard={t("Priority")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="prioridad"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => (
                <SelectComponent
                  options={[
                    { id: 'inmediata', valor: t("immediate") },
                    { id: 'urgente', valor: t("urgent") },
                    { id: 'normal', valor: t("normal") },
                  ]}
                  placeholder={t("select_priority")}
                  valueKey="id"
                  textKey="valor"
                  label={t("Priority")}
                  onChange={onChange}
                  value={value}
                  name={name}
                  register={() => ({ onChange, value, name, ref })}
                />
              )}
            />
          </CardStyle>

          <CardStyle titleCard={t("Description_of_the_Request")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="soli_descripcion_problemas"
              control={control}
              render={({ field }) => (
              <InputUpdate
                  {...field}
                  label={t("applicants_email")}
                  tipo="email"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
          </CardStyle>

          <CardStyle titleCard={t("Legal_Part")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="temas_legal"
              control={control}
              render={({ field }) => (
<InputUpdate
                  {...field}
                  label={t("applicants_email")}
                  tipo="email"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
          </CardStyle>

          <CardStyle titleCard={t("Observations")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="soli_observaciones"
              control={control}
              render={({ field }) => (
<InputUpdate
                  {...field}
                  label={t("applicants_email")}
                  tipo="email"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
          </CardStyle>

          <CardStyle titleCard={t("cost")} className="p-6 shadow-md rounded-lg">
            <Controller
              name="soli_costo_estimado"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputUpdate
                  {...field}
                  label={t("Total_price_of_repairs_and_maintenance")}
                  tipo="number"
                  errors={errors}
                  isUpdating={true}
                />
              )}
            />
          </CardStyle>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-12">
          <ButtonNext type="submit" text={t("actualizar")} className="bg-green-600 text-white w-full"/>
        </div>
      </form>
      </>
  );
};