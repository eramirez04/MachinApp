import PropTypes from "prop-types";
import { Dropdown, DropdownTrigger, DropdownMenu } from "@nextui-org/react";

export const DropDown = ({ children, DropdownTriggerElement }) => {
  return (
    <>
      <Dropdown
        radius="sm"
        classNames={{
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger>{DropdownTriggerElement}</DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          disabledKeys={["profile"]}
          className="p-7"
          variant="flat"
        >
          {children}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

DropDown.propTypes = {
  children: PropTypes.any,
  DropdownTriggerElement: PropTypes.any.isRequired,
};

