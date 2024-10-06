import React from 'react';
import { Alert } from "../../../index";
import { Textarea } from "@nextui-org/react";

export const TextAreaComponent = React.forwardRef(({ 
  register, 
  errors, 
  name, 
  descripcion, 
  label,
  ...props 
}, ref) => {
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
        ref={ref}
        {...props}
      />
      {errors[name]?.type === "required" && (
        <Alert descripcion={errors[name].message} />
      )}
    </>
  );
});

TextAreaComponent.displayName = 'TextAreaComponent';