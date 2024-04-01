
import React, { useState } from "react";
import { GrMap } from "react-icons/gr";
import { BsBuildings } from "react-icons/bs";
import { LuUserCog } from "react-icons/lu";
import { MdOutlineHomeWork } from "react-icons/md";
import { Link } from "react-router-dom";

const NavR = () => {
  const menus = [
    { name: "usuarios", link: "/panelcontrol", icon: LuUserCog },
    { name: "Sedes", link: "/PanelcontrolSedes", icon: GrMap },
    { name: "Areas", link: "/PanelcontrolAreas", icon: BsBuildings},
    { name: "Ambientes", link: "/PanelcontrolAmbientes", icon: MdOutlineHomeWork },
  ];
  const [open] = useState(true);
  return (
    <section className="flex  gap-6 pt-36 float-right ">
      <div className={`bg-[white] h-72 rounded-xl text-black px-2`}>
        <div className="py-3 flex ">
        </div>
        <div className="mt-4 flex flex-col gap-4 ">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-96"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
              </h2>
              <h2
                className={` absolute right-44 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:right-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavR;
 