import Alert from "../Alert";
import { Textarea } from "@headlessui/react";

export const TextAreaComponent = ({ register, errors, name }) => {
  return (
    <>
      {" "}
      <Textarea
        label="Descripcion"
        variant="bordered"
        placeholder="Descripcion..."
        disableAnimation
        disableAutosize
        classNames={{
          base: "max-w-xs",
          input: "resize-y min-h-[40px]",
        }}
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
