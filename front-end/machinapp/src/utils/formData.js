import { axiosCliente } from "../service/api/axios";

export const multiFormData = (url, datos, metodo) => {
  const data = new FormData();

  // Agregar los datos al FormData, con su respectiva clave y valor
  Object.entries(datos).forEach(([key, value]) => {
    data.append(key, value);
  });
  return axiosCliente({
    url,
    method: metodo,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
