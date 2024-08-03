import { useContext } from "react";
/* import { Avatar, DropdownItem } from "@nextui-org/react"; */
import { DropDown } from "./navigation/Dropdown";
import { AuthContext } from "../../contexts/AuthContext";
import { DropdownItem, User } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Icons } from "../atoms/icons/Icons";

import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const AvatarCom = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <DropDown
        DropdownTriggerElement={
          <User
            className="cursor-pointer"
            avatarProps={{
              isBordered: true,
              /*  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d", */
            }}
            name="Tony Reichert"
          />
        }
      >
        <DropdownItem key="profile" className="h-14 gap-2" textValue="re">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="settings" textValue="fff">
          <Link to={"/perfil"} className="flex gap-4">
            <Icons icon={UserCircleIcon} /> <p>Administrar Perfil de usuario</p>
          </Link>
        </DropdownItem>

        <DropdownItem key="help_and_feedback" textValue="tete">
          <Link className="flex gap-4">
            {" "}
            <Icons icon={QuestionMarkCircleIcon} /> <p>Help & Feedbackp</p>
          </Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={logout}
          textValue="2e2"
        >
          <div className="flex gap-4">
            <Icons icon={ArrowRightOnRectangleIcon} />
            <p> Salir</p>
          </div>
        </DropdownItem>
      </DropDown>
    </>
  );
};
