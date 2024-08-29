import { Icons, menus, V } from "../../../index";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TbPointFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

export const Nav = ({ rol }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(() => {
    const saved = localStorage.getItem("submenuOpen");
    return saved ? JSON.parse(saved) : {};
  });

  const handleSubmenuToggle = (name) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const storedSubmenuOpen = JSON.parse(localStorage.getItem("submenuOpen"));
    if (storedSubmenuOpen !== null) {
      setSubmenuOpen(storedSubmenuOpen);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("submenuOpen", JSON.stringify(submenuOpen));
  }, [submenuOpen]);

  return (
    <nav className="flex gap-6 w-64">
      <div
        className={`bg-[white] min-h-screen shadow-md  border-r-4 ${
          open ? "w-72" : "w-20"
        } duration-500 text-black px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <ul className="mt-9 flex flex-col gap-4 relative">
          {menus?.map(
            (menu, i) =>
              (menu.name !== "Panel de control" || rol === "Administrador") && (
                <li key={i} className="relative">
                  <Link
                    to={menu?.link}
                    className={`${
                      menu?.margin && "mt-96"
                    } group flex items-center hover:bg-gray-100 border text-sm gap-3.5 font-medium p-3 ${
                      V.radius
                    }`}
                    onClick={(e) => {
                      if (menu?.submenu) {
                        e.preventDefault();
                        handleSubmenuToggle(menu.name);
                      }
                    }}
                  >
                    <div className="p-1 rounded-full group-hover:scale-110 transition-transform duration-200">
                      <Icons icon={menu.icon} />
                    </div>
                    <span
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </span>
                    <h2
                      className={`${
                        open && "hidden"
                      }  left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu?.name}
                    </h2>
                  </Link>
                  {menu?.submenu && (
                    <div
                      className={`ml-6 mt-2 flex flex-col gap-2 transition-all duration-500 ease-in-out transform ${
                        submenuOpen[menu.name]
                          ? "max-h-40 opacity-100 translate-y-0 pointer-events-auto"
                          : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
                      }`}
                    >
                      {menu?.submenus.map((submenu, j) => (
                        <Link
                          to={submenu?.link}
                          key={j}
                          className={`text-sm font-medium p-2 hover:shadow-md hover:bg-gray-100 rounded-md flex items-center gap-2`}
                        >
                          <TbPointFilled size={16} />
                          {submenu?.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};
