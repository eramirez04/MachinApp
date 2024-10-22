import { useContext, useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { PDFSolicitud } from "../../../index.js";
import { ModalComponte } from "../../molecules/index.js";
import { useTranslation } from "react-i18next";

export const PDFvistaSolicitud = ({ item }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (item && item.idSolicitud) {
      setIsLoading(false);
    }
  }, [item]);

  if (isLoading) {
    return <p>Cargando datos del solicitud...</p>;
  }

  if (!item || !item.idSolicitud) {
    return <p>No se pudo cargar la información del solicitud.</p>;
  }

  const componenteModal = (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end space-x-2">
        <PDFDownloadLink
          document={<PDFSolicitud idSolicitud={item.idSolicitud} />}
          fileName={`solicitud_${item.idSolicitud}.pdf`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Button 
              color="success" 
              startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
              className="text-white"
              disabled={loading}
            >
              {loading ? 'Generando PDF...' : 'Descargar PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <div style={{ height: '70vh', width: '100%' }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <PDFSolicitud idSolicitud={item.idSolicitud} />
        </PDFViewer>
      </div>
    </div>
  );

  return (
    <ModalComponte
      buttonModal={t('Ver_pdf')}
      titleModal={`Vista previa del PDF - ${item.idSolicitud}`}
      componente={componenteModal}
      size="5xl"
      variantButton="shadow"
      colorButton="success"
      classNames="text-white" 
    />
  );
};
