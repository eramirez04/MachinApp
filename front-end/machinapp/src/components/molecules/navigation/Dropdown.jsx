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
          className="p-3 w-56"
          variant="flat"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
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

