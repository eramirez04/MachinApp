import zod from "zod";

const requestSolicitudMantenimiento = zod.object({
  prioridad: zod.enum(
    ["inmediata", "urgente", "normal"],
    {
      required_error: "Seleccione alguno de los tres tipos de documento",
      invalid_type_error: "Tipo de documento inválido",
    }
  ),
  estado: zod.enum(["pendiente", "aprobado", "finalizado"], {
    required_error: "Seleccione un estado",
  }),
  descripcion: zod.string({ required_error: "Describa el problema" }),
  costo_estimado: zod.string({
    required_error: "Agregue un costo para el (los) mantenimientos",
  }),
  observaciones: zod.string({ required_error: "Campo obligatorio" }), // Cambiado aquí
});


export const validarSolicitud_Mantenimiento = (data) => {
  return requestSolicitudMantenimiento.safeParse(data);
};
