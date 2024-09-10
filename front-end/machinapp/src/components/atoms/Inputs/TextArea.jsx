import { Alert } from "../../../index";
import { Textarea } from "@nextui-org/react";
/* import { useTranslation } from "react-i18next"; */
// eslint-disable-next-line react/prop-types
export const TextAreaComponent = ({ register, errors, name, descripcion , label}) => {
/*   const { t } = useTranslation(); */

  return (
    <>
      <Textarea
        variant="faded"
        label={label}
        placeholder="Enter your description"
        description={descripcion}
        className=""
        {...register(name, {
          required: {
            value: true,
            message: `${name} es obligatorio`,
          },
        })}
      />
      {/* eslint-disable-next-line react/prop-types */}
      {errors[name]?.type === "required" && (
        // eslint-disable-next-line react/prop-types
        <Alert descripcion={errors[name].message} />
      )}
    </>
  );
};
/*  */
