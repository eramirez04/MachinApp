import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { V } from "../../../style";

export const Breadcrumb = ({ pageName }) => {
  return (
    <>
      <div className="px-10 pt-7">
        <div className="flex flex-row justify-between">
          <span className="text-4xl font-bold text-gray-800 ">{pageName}</span>

          <Breadcrumbs>
            <BreadcrumbItem>
              <Link className="font-medium" to="/home">
                <span>Home</span>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{pageName}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className={`h-2 ${V.bg_sena_verde}  inline-block w-full`}></div>
      </div>
    </>
  );
};
