import { V, Icons } from "../../../index";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";

export const SearchComponent = ({ onSearch, label }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Espera 300ms después de que el usuario deje de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <label className="w-3/5">
        <Input
          radius="sm"
          type="text"
          label={label}
          color="success"
          variant="bordered"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={t("buscar")}
          startContent={<Icons icon={V.MagnifyingGlassIcon} />}
        />
      </label>
    </>
  );
};
