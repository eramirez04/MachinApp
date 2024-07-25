import { useState, useEffect } from "react";
import {Input} from "@nextui-org/react";
export const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

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

    <Input
      isRequired
      type="email"
      label="Email"
      defaultValue="junior@nextui.org"
      className="max-w-xs"
      onChange={handleInputChange}
    />
    );
};  