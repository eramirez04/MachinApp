import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { Button } from "@nextui-org/react";
import { TableCellsIcon } from '@heroicons/react/24/outline'; 

export const ExcelMantenimientos = ({ mantenimientos }) => {

    const exportToExcel = async () => {
        // Crear un nuevo libro de trabajo
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Mantenimientos');

        // Insertar imágenes en la primera fila
        const logoSenaNaranja = await fetch('/logoSenaNaranja.png').then(res => res.arrayBuffer());
        const defLOGOTIC = await fetch('/def_LOGOTIC.jpg').then(res => res.arrayBuffer());

        const logoSenaNaranjaId = workbook.addImage({
            buffer: logoSenaNaranja,
            extension: 'png',
        });

        const defLOGOTICId = workbook.addImage({
            buffer: defLOGOTIC,
            extension: 'jpg',
        });

        // Ajustar el tamaño en centímetros (convertir a píxeles)
        const cmToPx = (cm) => cm * 37.8; // Aproximadamente 37.8 px por cm
        const defLOGOTICWidthPx = cmToPx(8.02);
        const defLOGOTICHeightPx = cmToPx(3.97);

        // Añadir imágenes a las celdas correspondientes
        worksheet.addImage(logoSenaNaranjaId, {
            tl: { col: 0, row: 0 },
            ext: { width: cmToPx(5), height: cmToPx(5) }, // Ajusta el tamaño de la imagen logoSenaNaranja
            position: {
                type: 'oneCellAnchor',
                from: { col: 0, row: 0 },
                to: { col: 3, row: 0 }
            }
        });

        worksheet.addImage(defLOGOTICId, {
            tl: { col: 7, row: 0 },
            ext: { width: defLOGOTICWidthPx, height: defLOGOTICHeightPx }, // Ajusta el tamaño de la imagen def_LOGOTIC
            position: {
                type: 'oneCellAnchor',
                from: { col: 7, row: 0 },
                to: { col: 10, row: 0 }
            }
        });

        // Añadir texto en el centro de las imágenes
        worksheet.getCell('E1').value = 'Información general de los mantenimientos';
        worksheet.getCell('F1').value = 'Información general de los mantenimientos';
        worksheet.getCell('G1').value = 'Información general de los mantenimientos';
        worksheet.getCell('E1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('F1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('G1').alignment = { horizontal: 'center', vertical: 'middle' };

        // Combinar celdas para las imágenes y el texto
        worksheet.mergeCells('A1:D1'); // Combina las celdas para el logoSenaNaranja.png
        worksheet.mergeCells('E1:G1'); // Combina las celdas para el texto "Información general de los mantenimientos"
        worksheet.mergeCells('H1:K1'); // Combina las celdas para def_LOGOTIC.jpg

        // Ajustar la altura de la fila del encabezado para las imágenes
        worksheet.getRow(1).height = Math.max(defLOGOTICHeightPx / 37.8, 150); // Altura de la primera fila (imágenes y texto)

        // Definir los nuevos encabezados
        const headers = [
            'id del mantenimiento',
            'referencia de la maquina',
            'codigo del mantenimiento',
            'descripcion',
            'fecha de realizacion',
            'estado de la maquina',
            'id de la actividad',
            'nombre de la actividad',
            'tipo de mantenimiento',
            'estado de la ficha',
            'ficha relacionada'
        ];

        // Insertar encabezados en la fila 2
        const headerRow = worksheet.addRow(headers);

        // Aplicar formato a los encabezados
        headerRow.eachCell({ includeEmpty: true }, (cell) => {
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        // Ajustar altura de la fila de encabezado
        worksheet.getRow(2).height = 40; // Altura de la fila de encabezado

        // Ajustar ancho de columnas
        worksheet.columns.forEach(column => {
            column.width = 25; // Ajusta el ancho de todas las columnas (cambia este valor para ajustar la anchura)
        });

        // Ajustar el tamaño y el alineamiento de las imágenes
        worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('B1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('C1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('D1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('E1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('F1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('G1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('H1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('I1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('J1').alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell('K1').alignment = { horizontal: 'center', vertical: 'middle' };

        // Agregar datos
        mantenimientos.forEach(item => {
            const row = worksheet.addRow([
                item.idMantenimiento,
                item.referencia_maquina,
                item.codigo_mantenimiento,
                item.descripcion_mantenimiento,
                item.fecha_realizacion,
                item.estado_maquina,
                item.idActividades,
                item.acti_nombre,
                item.tipo_mantenimiento,
                item.estado_ficha,
                item.mant_fecha_proxima
            ]);

            // Ajustar alineación de las celdas de datos a la izquierda
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { horizontal: 'left', vertical: 'middle' };
            });
        });

        // Ajustar altura de las filas de datos
        worksheet.eachRow({ includeEmpty: true }, (row) => {
            // Ajustar solo las filas que no son la primera fila (imágenes) y la fila de encabezado
            if (row.number !== 1 && row.number !== 2) {
                row.height = 30; // Ajusta la altura de las filas de datos
            }
        });

        // Generar el archivo Excel y guardarlo
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, 'mantenimientos.xlsx');
    };

    return (
        <Button
            onClick={exportToExcel}
            color="success" // Color verde para diferenciar
            startContent={<TableCellsIcon className="h-5 w-5" />} // Ícono de Excel
            className="text-white text-xs md:text-sm"
        >
            Descargar Excel
        </Button>
    );
};
