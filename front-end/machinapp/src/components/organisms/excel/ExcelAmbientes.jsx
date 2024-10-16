import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { Button } from "@nextui-org/react";
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export const ExcelAmbientes = ({ ambientes }) => {
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hoja1');

        // Aumentar el ancho de las columnas
        worksheet.columns = [
            { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
            { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
            { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }
        ];

        const addBorders = (range) => {
            worksheet.getCell(range).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        };

        // Aumentar la altura de las filas con contenido extenso
        worksheet.getRow(1).height = 30;
        worksheet.getRow(3).height = 40;
        worksheet.getRow(14).height = 50;

        worksheet.mergeCells('A1:L1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'IDENTIFICACIÓN DEL ESTADO ACTUAL DEL AMBIENTE DE APRENDIZAJE "FIJO"';
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        titleCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFD966' }
        };
        addBorders('A1:L1');

        worksheet.mergeCells('A2:L2');
        const subtitleCell = worksheet.getCell('A2');
        subtitleCell.value = '(MODALIDAD PRESENCIAL )';
        subtitleCell.font = { bold: true, size: 12 };
        subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        subtitleCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFD966' }
        };
        addBorders('A2:L2');

        worksheet.mergeCells('A3:L3');
        const descriptionCell = worksheet.getCell('A3');
        descriptionCell.value = 'Grupo de Ejecución de la Formación Profesional - Dirección de Formación Profesional\nGrupo de Construcciones - Dirección Administrativa y Financiera';
        descriptionCell.font = { size: 10 };
        descriptionCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        descriptionCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFD966' }
        };
        addBorders('A3:L3');

        worksheet.mergeCells('A4:L4');
        const infoHeaderCell = worksheet.getCell('A4');
        infoHeaderCell.value = '1.INFORMACIÓN GENERAL';
        infoHeaderCell.font = { bold: true, size: 11 };
        infoHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        infoHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA6A6A6' }
        };
        addBorders('A4:L4');

        const generalInfo = [
            ['FECHA DILIGENCIAMIENTO:', '14/JUNIO/2019.', '', '', 'MUNICIPIO:', 'PITALITO'],
            ['REGIONAL:', 'HUILA', '', '', '', ''],
            ['CENTRO DE FORMACIÓN:', 'CENTRO DE GESTION Y DESARROLLO SOSTENIBLE SURCOLOMBIANO', '', '', '', ''],
            ['NOMBRE DE LA SEDE:', 'SEDE COMERCIO Y SERVICIOS', '', '', 'DIRECCIÓN SEDE:', 'CARRERA 8 # 7-53'],
            ['NOMBRE SUBDIRECTOR DE CENTRO:', 'JAMES ANTONIO RAMIRES LÓPEZ', '', '', 'DATOS DE CONTACTO:', '8365960']
        ];

        generalInfo.forEach((row, index) => {
            const rowNumber = index + 5;
            worksheet.getRow(rowNumber).height = 20; // Aumentar altura de estas filas
            worksheet.mergeCells(`A${rowNumber}:C${rowNumber}`);
            worksheet.mergeCells(`D${rowNumber}:F${rowNumber}`);
            worksheet.mergeCells(`G${rowNumber}:I${rowNumber}`);
            worksheet.mergeCells(`J${rowNumber}:L${rowNumber}`);

            ['A', 'D', 'G', 'J'].forEach((col, colIndex) => {
                const cell = worksheet.getCell(`${col}${rowNumber}`);
                cell.value = row[colIndex * 2];
                cell.font = { bold: colIndex % 2 === 0, size: 10 };
                cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFF2CC' }
                };
                addBorders(`${col}${rowNumber}:${String.fromCharCode(col.charCodeAt(0) + 2)}${rowNumber}`);

                if (row[colIndex * 2 + 1]) {
                    const valueCell = worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0) + 1)}${rowNumber}`);
                    valueCell.value = row[colIndex * 2 + 1];
                    valueCell.font = { size: 10 };
                    valueCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
                    valueCell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFF2CC' }
                    };
                }
            });
        });

        worksheet.mergeCells('A10:L10');
        const tenenciaHeaderCell = worksheet.getCell('A10');
        tenenciaHeaderCell.value = '2.TIPO DE TENENCIA :';
        tenenciaHeaderCell.font = { bold: true, size: 11 };
        tenenciaHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        tenenciaHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('A10:L10');

        worksheet.mergeCells('A11:L11');
        const ambienteHeaderCell = worksheet.getCell('A11');
        ambienteHeaderCell.value = '3.TIPO DE AMBIENTE DE FORMACIÓN:';
        ambienteHeaderCell.font = { bold: true, size: 11 };
        ambienteHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        ambienteHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('A11:L11');

        worksheet.mergeCells('A12:L12');
        const nombreAmbienteCell = worksheet.getCell('A12');
        nombreAmbienteCell.value = 'Nombre dado al Ambiente en el Centro de Formación (los aquí descritos son opcionales): AULA 101';
        nombreAmbienteCell.font = { size: 10 };
        nombreAmbienteCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        nombreAmbienteCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('A12:L12');

        worksheet.mergeCells('A13:L13');
        const descripcionHeaderCell = worksheet.getCell('A13');
        descripcionHeaderCell.value = '2.DESCRIPCIÓN FÍSICA DEL AMBIENTE DE FORMACIÓN';
        descripcionHeaderCell.font = { bold: true, size: 11 };
        descripcionHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        descripcionHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA6A6A6' }
        };
        addBorders('A13:L13');

        worksheet.mergeCells('A14:D14');
        const dimensionesCell = worksheet.getCell('A14');
        dimensionesCell.value = 'DIMENSIONES';
        dimensionesCell.font = { bold: true, size: 10 };
        dimensionesCell.alignment = { horizontal: 'center', vertical: 'middle' };
        dimensionesCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('A14:D14');

        worksheet.mergeCells('E14:I14');
        const indiceCell = worksheet.getCell('E14');
        indiceCell.value = 'ÍNDICE DE OCUPACIÓN:\nÁREA / No. DE APRENDICES QUE UTILIZAN EL AMBIENTE DE FORMA SIMULTÁNEA';
        indiceCell.font = { bold: true, size: 10 };
        indiceCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        indiceCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('E14:I14');

        worksheet.mergeCells('J14:L14');
        const puertaCell = worksheet.getCell('J14');
        puertaCell.value = 'PUERTA ACCESO';
        puertaCell.font = { bold: true, size: 10 };
        puertaCell.alignment = { horizontal: 'center', vertical: 'middle' };
        puertaCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };
        addBorders('J14:L14');

        worksheet.mergeCells('A17:L17');
        const acabadosHeaderCell = worksheet.getCell('A17');
        acabadosHeaderCell.value = '3.ACABADOS DEL AMBIENTE DE FORMACIÓN';
        acabadosHeaderCell.font = { bold: true, size: 11 };
        acabadosHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        acabadosHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA6A6A6' }
        };

        const subsections = ['PISOS:', 'MUROS:', 'GUARDAESCOBAS :', 'CIELO RASO:', 'VENTANERÍA:', 'PUERTAS (marque con una X según corresponda)'];
        subsections.forEach((subsection, index) => {
            const rowNumber = 18 + index;
            worksheet.getRow(rowNumber).height = 20; // Aumentar altura de estas filas
            const cell = worksheet.getCell(`A${rowNumber}`);
            cell.value = subsection;
            cell.font = { bold: true, size: 10 };
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFF2CC' }
            };
            worksheet.mergeCells(`A${rowNumber}:L${rowNumber}`);
        });

        worksheet.mergeCells('A24:F24');
        worksheet.mergeCells('G24:L24');
        ['4.ESQUEMA FUNCIONAL REAL DEL AMBIENTE DE FORMACIÓN\n(UBICACIÓN DE EQUIPOS INCLUIDOS SUS ESPACIOS COMPLEMENTARIOS, ACCESOS, FLUJOS).', '5.FOTO DEL AMBIENTE REAL DEL CENTRO DE FORMACIÓN'].forEach((header, index) => {
            const cell = worksheet.getCell(index === 0 ? 'A24' : 'G24');
            cell.value = header;
            cell.font = { bold: true, size: 11 };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFA6A6A6' }
            };
        });

        worksheet.mergeCells('A29:L29');
        const maquinariaHeaderCell = worksheet.getCell('A29');
        maquinariaHeaderCell.value = '6.DESCRIPCIÓN DE MAQUINARIA, EQUIPOS, EXISTENTES EN EL AMBIENTE DE APRENDIZAJE';
        maquinariaHeaderCell.font = { bold: true, size: 11 };
        maquinariaHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        maquinariaHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA6A6A6' }
        };

        worksheet.mergeCells('A30:L30');
        const equiposDescCell = worksheet.getCell('A30');
        equiposDescCell.value = 'Equipos (Elementos útiles que operan para un servicio o trabajo determinado, es de rango menor a la maquinaria. (Ejemplo: equipo de fumigación que puede ser manual o accionado por otra máquina es decir mecanizada))';
        equiposDescCell.font = { size: 10, italic: true };
        equiposDescCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        equiposDescCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFF2CC' }
        };

        const equipmentHeaders = ['NÚMERO PLACA SENA', 'NOMBRE DE LA MÁQUINA O EQUIPO', 'CANT', 'ESTADO DE FUNCIONAMIENTO', 'FECHA ADQUISICIÓN', 'TIEMPO DE VIDA ÚTIL EQUIPO', 'OBSERVACIONES GENERALES'];
        equipmentHeaders.forEach((header, index) => {
            const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}31`);
            cell.value = header;
            cell.font = { bold: true, size: 10 };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFF2CC' }
            };
        });
        worksheet.getRow(31).height = 30; // Aumentar altura de la fila de encabezados

        const exampleRow = ['3020113945', 'TELEVISOR MARCA:SAMSUNG LFD 55" MODELO:DM55E', '1', 'BUENO', '12/01/2016', '5', ''];
        exampleRow.forEach((value, index) => {
            const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}32`);
            cell.value = value;
            cell.font = { size: 10 };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
        worksheet.getRow(32).height = 25; // Aumentar altura de la fila de ejemplo

        worksheet.mergeCells('A42:L42');
        const confortHeaderCell = worksheet.getCell('A42');
        confortHeaderCell.value = '11.OBSERVACIONES:';
        confortHeaderCell.font = { bold: true, size: 11 };
        confortHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
        confortHeaderCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA6A6A6' }
        };

        // Ajustar el ancho de columnas específicas si es necesario
        worksheet.getColumn('B').width = 30; // Aumentar ancho de la columna B para el nombre del equipo
        worksheet.getColumn('G').width = 25; // Aumentar ancho de la columna G para observaciones

        // Aplicar bordes a todas las celdas utilizadas
        // Reemplazar el bloque de código que aplica bordes con este:
        const usedRange = worksheet.usedRange;
        if (usedRange && usedRange.top && usedRange.bottom && usedRange.left && usedRange.right) {
            for (let rowNumber = usedRange.top; rowNumber <= usedRange.bottom; rowNumber++) {
                for (let colNumber = usedRange.left; colNumber <= usedRange.right; colNumber++) {
                    const cell = worksheet.getCell(rowNumber, colNumber);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                }
            }
        } else {
            // Si no hay rango utilizado, aplicar bordes a un rango predefinido
            for (let rowNumber = 1; rowNumber <= 42; rowNumber++) {
                for (let colNumber = 1; colNumber <= 12; colNumber++) {
                    const cell = worksheet.getCell(rowNumber, colNumber);
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                }
            }
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, 'ficha_ambiente.xlsx');
    };

    return (
        <DocumentArrowDownIcon
        className="h-6 w-6 text-blue-500 cursor-pointer"
        onClick={exportToExcel}
      />
    );  
};