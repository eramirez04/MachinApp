import { V } from "../style";

import { FaUserGear } from "react-icons/fa6";

export const menus = (t) => [
  { name: t("inicio"), link: "/home", icon: V.HomeIcon },
  {
    name: t("sitios"),
    link: "#",
    icon: V.MapIcon,
    submenu: true,
    submenus: [
      { name: t("sedes"), link: "/Sedes" },
      { name: t("areas"), link: "/Areas" },
      { name: t("ambientes"), link: "/Ambientes" },
    ],
  },
  {
    name: t("mantenimientos"),
    link: "#",
    icon: V.DocumentTextIcon,
    submenu: true,
    submenus: [
      { name: t("registrar_solicitud"), link: "/solicitud/registrar" },
      { name: t("registrar_mantenimiento"), link: "/crear_ficha_mantenimiento" },
      { name: t("solicitudes"), link: "/solicitud" },
    ],
  },
  { name: t("equipo_maquinaria"), link: "/Maquinas", icon: V.ServerIcon },
  { name: t("historial"), link: "/Historial", icon: V.ClockIcon },
  {
    name: t("panel_control"),
    link: "/Panelcontrol",
    icon: FaUserGear,
  },
];
