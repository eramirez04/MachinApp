import React from "react";
import { Input } from "@nextui-org/react";

export const InputUpdate = React.forwardRef(
  (
    { errors, value, name, tipo, onChange, isUpdating = false, ...props },
    ref
  ) => {
    const handleValidation = () => {
      if (isUpdating && !value) {
        return `${name} es obligatorio`;
      }
      return errors[name]?.message;
    };

    return (
      <div className="mb-5">
        <div className="z-0 w-full">
          <label
            className="mb-3 block text-green-500 dark:text-gray-400text-sm font-medium "
            htmlFor="fullName"
          >
            {name}
          </label>
          <Input
            type={tipo}
            variant="bordered"
            name={name}
            id={name}
            label={name}
            isInvalid={Boolean(handleValidation())}
            autoFocus
            errorMessage={handleValidation()}
            autoComplete="off"
            value={isUpdating ? value : undefined}
            onChange={isUpdating ? onChange : undefined}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputUpdate.displayName = "InputUpdate";
