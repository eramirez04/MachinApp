import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from "@nextui-org/react"
import { TableCellsIcon } from '@heroicons/react/24/outline';


// En su componente React
export const ExcelMaquinasMant = ({infoMaquina, infoMantenimientos}) => {


  const infoMa = infoMaquina

  const infoMant = infoMantenimientos

    const generateExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Plan de mantenimiento');
      
        // Set column widths
        worksheet.columns = [
          { width: 10 }, { width: 35 }, { width: 35 }, { width: 25 },
          { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
          { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
        ];
      
        // Add title
        worksheet.mergeCells('A2:M2');
        const titleCell = worksheet.getCell('A2');
        titleCell.value = 'Plan de mantenimiento';
        titleCell.font = { bold: true, size: 16 };
        titleCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF6BC89A' }
        };
        titleCell.alignment = { horizontal: 'center' }

        //title solicitud
        worksheet.mergeCells('B16:E16');
        const titleSoli = worksheet.getCell('B16');
        titleSoli.value = 'Solcitud';
        titleSoli.font = { bold: true};
        titleSoli.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFDBDBDB' }
        };
        titleSoli.alignment = { horizontal: 'center' }


        //title mantenimiento
        worksheet.mergeCells('F16:M16');
        const titleMant = worksheet.getCell('F16');
        titleMant.value = 'Mantenimiento';
        titleMant.font = { bold: true};
        titleMant.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F0F0F0' }
        };
        titleMant.alignment = { horizontal: 'center' }
      
        // Add Informacion Equipo section
        worksheet.mergeCells('B5:C5')
        const subtitle = worksheet.getCell('B5')
        subtitle.font = { bold: true }
        worksheet.getCell('B5').value = 'Informacion Equipo';
        worksheet.getCell('B5').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        }
        subtitle.alignment = { horizontal: 'center' }
      
        // Add Ubicación section
        worksheet.mergeCells('E5:F5');
        const subtitleUb = worksheet.getCell('E5')
        subtitleUb.font = { bold: true }
        worksheet.getCell('E5').value = 'Ubicación';
        worksheet.getCell('E5').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        }
        subtitleUb.alignment = { horizontal: 'center' }
      
        // Add fields
        const fields = [
          { label: 'Nombre ficha:', value: `${infoMa.tipoEquipo}` },
          { label: 'Placa SENA:', value: `${infoMa.fi_placa_sena}` },
          { label: 'Modelo:', value: `${infoMa.fi_modelo}` },
          { label: 'Marca:', value: `${infoMa.fi_marca}` },
          { label: 'Estado:', value: `${infoMa.fi_estado}` },
          { label: 'Fecha adquisicion:', value: `${infoMa.fi_fecha_adquisicion}` },
          { label: 'Fecha inicio garantia:', value: `${infoMa.fi_fecha_inicio_garantia}` },
          { label: 'Fecha fin garantia:', value: `${infoMa.fi_fecha_fin_garantia}` },
        ];
      
        fields.forEach((field, index) => {
          worksheet.getCell(`B${7 + index}`).value = field.label;
          worksheet.getCell(`C${7 + index}`).value = field.value;
        });
      
        // Add location fields
        const locationFields = [
          { label: 'Regional:', value: `${infoMa.sede_municipio} - ${infoMa.sede_regional}` },
          { label: 'ede:', value: `${infoMa.sede_nombre}` },
          { label: 'Area:', value: `${infoMa.area_nombre}`},
          { label: 'Ambiente:', value: `${infoMa.sit_Nombre}` },
          { label: 'Direccion:', value: `${infoMa.sede_direccion}` }
        ]
        locationFields.forEach((field, index) => {
          worksheet.getCell(`E${7 + index}`).value = field.label;
          worksheet.getCell(`F${7 + index}`).value = field.value;
        });
      
        // Add table headers
        const headers = [
          'Codigo Mantenimiento', 'Nombre solicitante', 'Descripcion Solicitud', 'Fecha Solicitud',
          'Costo estimado', 'Estado Mantenimiento', 'Proximo Mantenimiento', 'Fecha Realizacion',
          'Tipo mantenimiento', 'Descripcion Mantenimiento', 'Tecnico responsable', 'Empresa ','Costo final'
        ]
      
        worksheet.getRow(17).values = headers
        worksheet.getRow(17).font = { bold: true };
        worksheet.getRow(17).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        }
        
        infoMant.forEach((mantenimiento, index) => {
          const row = worksheet.getRow(18 + index);
          row.values = [
            mantenimiento.mant_codigo_mantenimiento,
            mantenimiento.nombre_solicitante,
            mantenimiento.soli_descripcion_problemas,
            new Date(mantenimiento.fecha_solicitud).toLocaleDateString(),
            mantenimiento.soli_costo_estimado,
            mantenimiento.mant_estado,
            new Date(mantenimiento.mant_fecha_proxima).toLocaleDateString(),
            new Date(mantenimiento.man_fecha_realizacion).toLocaleDateString(),
            mantenimiento.tipo_mantenimiento,
            mantenimiento.mant_descripcion,
            `${mantenimiento.tecnico.nombre} ${mantenimiento.tecnico.apellidos}`,
            mantenimiento.tecnico.empresa,
            mantenimiento.mant_costo_final
          ]
        })
      
        // Generate and save the file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `plan_de_mantenimiento_${infoMa.fi_placa_sena}.xlsx`)
      }
      
  return (
    <>
    <Button 
    color='success'  
    startContent={<TableCellsIcon className="h-5 w-5" />} 
    className='text-white' 
    onClick={generateExcel} >
      
      Generar Excel

    </Button>
    </>

  );
};
