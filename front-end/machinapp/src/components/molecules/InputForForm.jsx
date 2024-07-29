import Alert from "../atoms/feedback/Alert";
import { Input } from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
const InputforForm = ({ register, errors, value, name, tipo, onChange }) => {
  return (
    <>
      <div className="mb-5">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor={name}
            className="peer-focus:font-medium  text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {name}:
          </label>
          <Input
            type={tipo}
            name={name}
            id={name}
            label={name}
            errorMessage="Please enter a valid email"
            {...register(name, {
              required: {
                value: true,
                message: `${name} es obligatorio`,
              },
            })}
            value={value}
            onChange={onChange}
          />

          {/* eslint-disable-next-line react/prop-types */}
          {errors[name]?.type === "required" && (
            // eslint-disable-next-line react/prop-types
            <Alert descripcion={errors[name].message} />
          )}
        </div>
      </div>
    </>
  );
};

export default InputforForm;
