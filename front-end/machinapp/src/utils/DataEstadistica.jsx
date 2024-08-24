import { V } from "../style";

import { FaUserGear } from "react-icons/fa6";

export const menus = [
  { name: "Inicio", link: "/home", icon: V.HomeIcon },
  {
    name: "Sitios",
    link: "#",
    icon: V.MapIcon,
    submenu: true,
    submenus: [
      { name: "Sedes", link: "/Sedes" },
      { name: "Areas", link: "/Areas" },
      { name: "Ambientes", link: "/Ambientes" },
    ],
  },
  {
    name: "Mantenimientos",
    link: "#",
    icon: V.DocumentTextIcon,
    submenu: true,
    submenus: [
      { name: "Registrar Solicitud", link: "/solicitud/registrar" },
      { name: "Registrar Mantenimiento", link: "/crear_ficha_mantenimiento" },
      { name: "Solicitudes", link: "/solicitud" },
    ],
  },
  { name: "Equipo y Maquinaria", link: "/Maquinas", icon: V.ServerIcon },
  { name: "Historial", link: "/Historial", icon: V.ClockIcon },
  {
    name: "Panel de control",
    link: "/Panelcontrol",
    icon: FaUserGear,
  },
];
