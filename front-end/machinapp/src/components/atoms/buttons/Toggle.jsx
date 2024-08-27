import { Switch } from "@nextui-org/react";
/* import { useState } from "react"; */

export const Toggles = ({ onClick, isSelected }) => {
  /* const [isSelected, setIsSelected] = useState(true); */
  return (
    <>
      <div className="flex flex-col gap-2">
        <Switch isSelected={isSelected} onValueChange={onClick}></Switch>
        {/*  <p className="text-small text-default-500">
          Selected: {isSelected ? "true" : "false"}
        </p> */}
      </div>
    </>
  );
};
