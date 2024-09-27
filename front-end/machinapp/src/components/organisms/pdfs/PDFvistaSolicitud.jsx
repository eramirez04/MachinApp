
import { Button } from "@nextui-org/react";
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFSolicitud } from "../../../index.js";
import { ModalComponte } from "../../molecules/index.js";

export const PDFvistaSolicitud = ({ item }) => {

  const componenteModal = (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end space-x-2">

        <PDFDownloadLink
          document={<PDFSolicitud data={item} />}
          fileName={`solicitud_${item.idSolicitud}.pdf`}
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
          <PDFSolicitud data={item} />
        </PDFViewer>
      </div>
    </div>
  );

  return (
    <ModalComponte
      buttonModal="Ver PDF"
      tittleModal={`Vista previa del PDF - ${item.idSolicitud}`}
      componente={componenteModal}
      size="5xl"
      variantButton="shadow"
      colorButton="success"
      classNames= "text-white" 
    />
  );
};