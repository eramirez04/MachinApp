import { DropDown } from "./navigation/Dropdown";
import { DropdownItem, User } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Icons } from "../atoms/icons/Icons";

import { useAuth } from "../../hooks/useAuth";

import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const AvatarCom = () => {
  const { logout, user } = useAuth();
  return (
    <>
      <DropDown
        DropdownTriggerElement={
          <User
            className="cursor-pointer font-bold"
            avatarProps={{
              isBordered: true,
              /*  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d", */
            }}
            name={`${user.us_nombre} ${user.us_apellidos}`}
          />
        }
      >
        <DropdownItem key="profile" className="h-14 gap-2" textValue="re">
          <p className="font-bold">{`${user.us_nombre} ${user.us_apellidos}`}</p>
          <p className="font-bold">{user.us_correo}</p>
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
