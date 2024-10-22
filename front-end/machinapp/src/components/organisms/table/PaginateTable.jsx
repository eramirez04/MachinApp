import { Paginacion, V } from "../../../index";
import { useState } from "react";

import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  TableRow,
} from "@nextui-org/react";

export const PaginateTable = ({ columns, data, itemsPerPage = 10 }) => {
  // paginacion

  const [currentPage, setCurrentPage] = useState(1);
  const totalPersonas = data.length;

  const lastIndex = currentPage * itemsPerPage; // 1 * 8 = 8
  const firsIndex = lastIndex - itemsPerPage; // 8 - 8 = 0

  return (
    <>
      <div className="flex flex-col w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <Table aria-label="Tabla de Datos Paginada" className="h-full">
          <TableHeader>
            {columns.map((column, index) => (
              <TableColumn
                key={index}
                className={`${V.bg_sena_verde} text-gray-100 px-2 sm:px-4 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                {column}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data
              .map((row, index) => (
                <TableRow
                  className="hover:bg-gray-50 transition-colors duration-200"
                  key={index}
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="px-2 sm:px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
              .slice(firsIndex, lastIndex)}
          </TableBody>
        </Table>
        <div className="py-3 px-4 bg-gray-50">
          <Paginacion
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={totalPersonas}
            personaPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  );
};

PaginateTable.propTypes = {
  columns: PropTypes.any.isRequired,
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
};
