import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
} from "@nextui-org/react";

export const DropDown = ({ children, DropdownTriggerElement }) => {
  return (
    <>
      <Dropdown
        showArrow
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
          <DropdownSection
            className="flex flex-col"
            aria-label="Profile & Actions"
          >
            {children}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

DropDown.propTypes = {
  children: PropTypes.element,
  DropdownTriggerElement: PropTypes.element.isRequired,
};
