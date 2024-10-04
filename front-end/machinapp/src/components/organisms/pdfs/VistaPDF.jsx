import { Button } from "@nextui-org/react";
import { PencilSquareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { GenerarPdf } from "../../../index.js";
import { ModalComponte } from "../../molecules/index.js";
import { useNavigate } from 'react-router-dom';

export const VistaPDF = ({ item }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/listar_por_id/${item.idMantenimiento}`);
  };

  const componenteModal = (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end space-x-2">
        <Button
          color="warning"
          startContent={<PencilSquareIcon className="h-5 w-5" />}
          className="text-white"
          onClick={handleEdit}
        >
          Editar
        </Button>
        <PDFDownloadLink
          document={<GenerarPdf idMantenimiento={item.idMantenimiento} />}
          fileName={`mantenimiento_${item.idMantenimiento}.pdf`}
        >
          {({loading}) => (
            <Button 
              color="success" 
              startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
              className="text-white"
              disabled={loading}
            >
              Descargar PDF
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <div style={{ height: '70vh', width: '100%' }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <GenerarPdf idMantenimiento={item.idMantenimiento} />
        </PDFViewer>
      </div>
    </div>
  );

  return (
    <ModalComponte
      buttonModal="Ver PDF"
      tittleModal={`Vista previa del PDF - ${item.codigo_mantenimiento}`}
      componente={componenteModal}
      size="5xl"
      variantButton="shadow"
      colorButton="success"
      classNames= "text-white" 
    />
  );
};