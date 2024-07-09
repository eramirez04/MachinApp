
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { MdHomeWork } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MenuLeft = () => {
  const menus = [
    { name: "PaneldeControl", link: "/PanelControl", icon: FaUserGear },
    { name: "PanelControlAreas", link: "/PanelControlAreas", icon: FaFileUpload },
    { name: "PanelControlSedes", link: "/PanelControlSedes", icon: GiGears},
    { name: "PanelControlSitios", link: "/PanelControlSitios", icon: FaHistory},
  ];
  const [open, ] = useState(true);
  return (
    <section className="flex gap-6  justify-end">
      <div
        className={`bg-[white]   "w-16"
        }  text-black px-4`}
      >
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-96"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
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
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
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

export default MenuLeft