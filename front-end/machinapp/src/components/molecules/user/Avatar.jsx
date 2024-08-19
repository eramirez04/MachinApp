import { useAuth, Icons } from "../../../index";
import { DropDown } from "../navigation/Dropdown";
import { User } from "@nextui-org/react";
import { Link } from "react-router-dom";

import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const AvatarCom = () => {
  const { logout, user } = useAuth();

  const ItemsDrop = [
    <>
      <p className="font-bold">{`${user.us_nombre} ${user.us_apellidos}`}</p>
      <p className="font-bold">{user.us_correo}</p>
    </>,
    <>
      <Link to={"/perfil"} className="flex gap-4">
        <Icons icon={UserCircleIcon} /> <p>Administrar Perfil de usuario</p>
      </Link>
    </>,
    <>
      <Link className="flex gap-4">
        <Icons icon={QuestionMarkCircleIcon} /> <p>Help & Feedbackp</p>
      </Link>
    </>,
    <>
      <div className="flex gap-4" onClick={logout}>
        <Icons icon={ArrowRightOnRectangleIcon} />
        <p> Salir</p>
      </div>
    </>,
  ];

  return (
    <>
      <DropDown
        DropdownTriggerElement={
          <User
            className="cursor-pointer font-bold"
            avatarProps={{
              isBordered: true,
            }}
            name={`${user.us_nombre} ${user.us_apellidos}`}
          />
        }
        dropdown={ItemsDrop}
      />
    </>
  );
};
