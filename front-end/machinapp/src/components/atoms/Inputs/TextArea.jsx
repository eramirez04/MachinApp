import Alert from "../feedback/Alert";
import { Textarea } from "@nextui-org/react";
// eslint-disable-next-line react/prop-types
export const TextAreaComponent = ({ register, errors, name }) => {
  return (
    <>
      <Textarea
        variant="faded"
        label="Description"
        placeholder="Enter your description"
        description="Enter a concise description of your project."
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
