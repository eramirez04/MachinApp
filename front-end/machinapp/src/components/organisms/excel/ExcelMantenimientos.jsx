import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { Button } from "@nextui-org/react";
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { axiosCliente } from "../../../index.js";

export const ExcelMantenimientos = () => {
    const [mantenimientosData, setMantenimientosData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosCliente.get('mantenimiento/excelconsultavariables');
                setMantenimientosData(response.data);
            } catch (error) {
                console.error('Error en excel:', error);
            }
        };

        fetchData();
    }, []);

    const exportToExcel = async () => {
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
        const cmToPx = (cm) => cm * 37.8;
        const logoSenaNaranjaWidthPx = cmToPx(3);
        const logoSenaNaranjaHeightPx = cmToPx(3);
        const defLOGOTICWidthPx = cmToPx(8.02);
        const defLOGOTICHeightPx = cmToPx(3.97);

        // Añadir imágenes a las celdas correspondientes y centrarlas
        worksheet.addImage(logoSenaNaranjaId, {
            tl: { col: 0, row: 0 },
            ext: { width: logoSenaNaranjaWidthPx, height: logoSenaNaranjaHeightPx },
            editAs: 'oneCell'
        });

        worksheet.addImage(defLOGOTICId, {
            tl: { col: 11, row: 0 },
            ext: { width: defLOGOTICWidthPx, height: defLOGOTICHeightPx },
            editAs: 'oneCell'
        });

        // Combinar celdas y añadir imágenes
        worksheet.mergeCells('A1:D1');
        worksheet.mergeCells('I1:P1');

        worksheet.addImage(logoSenaNaranjaId, {
            tl: { col: 0, row: 0 },
            br: { col: 3, row: 0 },
            editAs: 'oneCell'
        });

        worksheet.addImage(defLOGOTICId, {
            tl: { col: 8, row: 0 },
            br: { col: 14, row: 0 },
            editAs: 'oneCell'
        });

        // Añadir texto en el centro de las imágenes
        worksheet.mergeCells('E1:H1');
        const titleCell = worksheet.getCell('E1');
        titleCell.value = 'Información general de mantenimientos';
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        titleCell.font = { bold: true, size: 14 };

        // Ajustar la altura de la fila del encabezado para las imágenes
        worksheet.getRow(1).height = Math.max(defLOGOTICHeightPx, logoSenaNaranjaHeightPx);

        // Definir los nuevos encabezados basados en los datos recibidos
        const headers = [
            'ID Mantenimiento',
            'Placa SENA',
            'Código Mantenimiento',
            'Fecha Realización',
            'Proximo mantenimiento',
            'Nombre',
            'Costo Final',
            'Descripción Mantenimiento',
            'Tipo Mantenimiento',
            'Sitio',
            'Área',
            'Centro',
            'Sede',
            'Prioridad',
            'Nombre Repuesto',
            'Costo Total Repuestos'
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
        worksheet.getRow(2).height = 40;

        // Ajustar ancho de columnas
        worksheet.columns.forEach(column => {
            column.width = 25;
        });

        // Agregar datos
        mantenimientosData.forEach(item => {
            const row = worksheet.addRow([
                item.idMantenimiento,
                item.fi_placa_sena,
                item.codigo_mantenimiento,
                `Fecha: ${new Date(item.man_fecha_realizacion).toLocaleDateString()}`,
                `Fecha: ${new Date(item.mant_fecha_proxima).toLocaleDateString()}`,
                item.nombre,
                item.mant_costo_final,
                item.descripcion_mantenimiento,
                item.tipo_mantenimiento,
                item.sit_nombre,
                item.area_nombre,
                item.sede_nombre_centro,
                item.sede_nombre,
                item.soli_prioridad,
                item.par_nombre_repuesto,
                item.par_costo_total
            ]);

            // Ajustar alineación de las celdas de datos a la izquierda
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { horizontal: 'left', vertical: 'middle' };
            });
        });

        // Ajustar altura de las filas de datos
        worksheet.eachRow({ includeEmpty: true }, (row) => {
            if (row.number !== 1 && row.number !== 2) {
                row.height = 30;
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
            color="success"
            startContent={<TableCellsIcon className="h-5 w-5" />}
            className="text-white text-xs md:text-sm"
        >
            Descargar Excel
        </Button>
    );
};