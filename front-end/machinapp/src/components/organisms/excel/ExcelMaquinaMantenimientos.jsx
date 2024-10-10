import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


// En su componente React
export const ExcelMaquinasMant = () => {




    const generateExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Plan de mantenimiento');
      
        // Set column widths
        worksheet.columns = [
          { width: 20 }, { width: 30 }, { width: 30 }, { width: 15 },
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
          fgColor: { argb: 'FF90EE90' }
        };
        titleCell.alignment = { horizontal: 'center' };
      
        // Add Informacion Equipo section
        worksheet.mergeCells('A5:G5');
        worksheet.getCell('A5').value = 'Informacion Equipo';
        worksheet.getCell('A5').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        };
      
        // Add Ubicación section
        worksheet.mergeCells('K5:M5');
        worksheet.getCell('K5').value = 'Ubicación';
        worksheet.getCell('K5').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        };
      
        // Add fields
        const fields = [
          { label: 'Nombre ficha:', value: 'Ficha tecssssssssssssssssssssssnica' },
          { label: 'Placa SENA:', value: 'qqqq' },
          { label: 'Modelo:', value: 'qqqqqq' },
          { label: 'Marca:', value: 'qqqqqqq' },
          { label: 'Estado:', value: 'qqqqqqqq' },
          { label: 'Fecha adquisicion:', value: '' },
        ];
      
        fields.forEach((field, index) => {
          worksheet.getCell(`A${7 + index}`).value = field.label;
          worksheet.getCell(`C${7 + index}`).value = field.value;
        });
      
        // Add location fields
        const locationFields = ['Regional:', 'sede:', 'Area:', 'Ambiente:', 'Direccion:'];
        locationFields.forEach((field, index) => {
          worksheet.getCell(`K${7 + index}`).value = field;
        });
      
        // Add table headers
        const headers = [
          'Codigo Mantenimien', 'Nombre solicitante', 'Solicitud', 'soli_descripcion_fecha_solicitud',
          'Costo estimado', 'estado Mantenimiento', 'Proximo mantenimiento', 'fecha de realizacion',
          'Tipo mantenimiento', 'descripcion Mantenimiento', 'Tecnico', 'Costo final'
        ];
      
        worksheet.getRow(24).values = headers;
        worksheet.getRow(24).font = { bold: true };
        worksheet.getRow(24).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD9FFD9' }
        };
      
        // Generate and save the file
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), 'plan_de_mantenimiento.xlsx');
      }
      
  return (
    <button onClick={generateExcel}>Generar Excel</button>
  );
};
