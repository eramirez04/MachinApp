/* import { Radio } from "@nex,tui-org/react"; */
import { RadioGroup, Radio } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const RadioComponent = ({
  descripcionC,
  values,
  label,
  register,
  errors,
  name,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectionChange = (newValue) => {
    setSelectedValue(newValue);
    console.log(name,newValue);
  };
  return (
    <>
      <RadioGroup
        label={label}
        description={descripcionC}
        value={values.find((v) => v.name === watch(name))?.name || ""}
        onValueChange={handleSelectionChange}
        isInvalid={!!errors[name]}
        errorMessage={errors[name]?.message}
      >
        <div className="flex flex-row justify-evenly">
          {values.map((valor) => (
            <Radio
              key={valor.name}
              value={valor.name}
              description={valor.descripcion}
            >
              {valor.name}
            </Radio>
          ))}
        </div>
      </RadioGroup>
    </>
  );
};
