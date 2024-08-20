export const SelectComponent = ({
  options,
  name,
  register,
  placeholder,
  label,
  onChange,
  value = true,
  ...restProps
}) => {
  const props = { ...restProps };
  return (
    <>
      <div className="max-w-sm mx-auto flex items-center justify-evenly">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <select
          id="countries"
          name={name}
          onChange={onChange}
          {...register(name, {
            required: {
              value: value,
              message: `${name} es requerido`,
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=""> {placeholder}</option>
          {options.map((item, index) => (
            <option key={index} value={item[props.valueKey]}>
              {item[props.textKey]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
