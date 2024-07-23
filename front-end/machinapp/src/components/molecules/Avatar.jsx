import { useContext } from "react";
import { Avatar, DropdownItem } from "@nextui-org/react";
import { DropDown } from "./navigation/Dropdown";
import { AuthContext } from "../../contexts/AuthContext";

export const AvatarCom = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <DropDown
        DropdownTriggerElement={
          <Avatar
            isBordered
            radius="full"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
        }
      >
        <DropdownItem key="dashboard">Dashboard</DropdownItem>{" "}
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" onClick={logout}>
          Log Out
        </DropdownItem>{" "}
      </DropDown>
    </>
  );
};
