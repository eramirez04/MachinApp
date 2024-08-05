import { useState } from "react";
import { Paginacion } from "../../molecules/PaginationCom";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
  TableRow,
} from "@nextui-org/react";

export const PaginateTable = ({ columns, data, itemsPerPage = 10}) => {
  // paginacion

  const [currentPage, setCurrentPage] = useState(1);
  const totalPersonas = data.length;

  const lastIndex = currentPage * itemsPerPage; // 1 * 8 = 8
  const firsIndex = lastIndex - itemsPerPage; // 8 - 8 = 0

  return (
    <>
      <div className="flex flex-col w-full">
        <Table aria-label="Paginated Data Table">
          <TableHeader >
            {/* eslint-disable-next-line react/prop-types */}
            {columns.map((column, index) => (
              <TableColumn key={index} className="bg-custom-green text-white font-bold">
                {column}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody >
            {data
              .map((row, index) => (
                <TableRow className="" key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))
              .slice(firsIndex, lastIndex)}
          </TableBody>
        </Table>
        <Paginacion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={totalPersonas}
          personaPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};

PaginateTable.propTypes = {
  columns: PropTypes.any.isRequired,
  data: PropTypes.array,
  itemsPerPage: PropTypes.number,
};
