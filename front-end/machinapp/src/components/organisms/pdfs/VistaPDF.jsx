import { useContext, useEffect, useState } from 'react';
import { Button } from "@nextui-org/react";
import { PencilSquareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { GenerarPdf } from "./PDFMantenimiento.jsx"; 
import { ModalComponte } from "../../molecules/index.js";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import { useTranslation } from "react-i18next";

export const VistaPDF = ({ item }) => {
  const navigate = useNavigate();
  const { rol } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (item && item.idMantenimiento) {
      setIsLoading(false);
    }
  }, [item]);

  const handleEdit = () => {
    if (item && item.idMantenimiento) {
      navigate(`/listar_por_id/${item.idMantenimiento}`);
    }
  };

  const isAdmin = rol === "Administrador";

  if (isLoading) {
    return <p>Cargando datos del mantenimiento...</p>;
  }

  if (!item || !item.idMantenimiento) {
    return <p>No se pudo cargar la información del mantenimiento.</p>;
  }

  const componenteModal = (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end space-x-2">
        {isAdmin && (
          <Button
            color="warning"
            startContent={<PencilSquareIcon className="h-5 w-5" />}
            className="text-white"
            onClick={handleEdit}
          >
            {t('editar')}
          </Button>
        )}
        <PDFDownloadLink
          document={<GenerarPdf idMantenimiento={item.idMantenimiento} />}
          fileName={`mantenimiento_${item.idMantenimiento}.pdf`}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Button 
              color="success" 
              startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
              className="text-white"
              disabled={loading}
            >
              {loading ? t('cargando') : t('descargar_pdf')}
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
      buttonModal={t('Ver_pdf')}
      tittleModal={`Vista previa del PDF - ${item.codigo_mantenimiento}`}
      componente={componenteModal}
      size="5xl"
      variantButton="shadow"
      colorButton="success"
      classNames="text-white" 
    />
  );
};
