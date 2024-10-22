import { FichaTecnicaEquiposPDF, ModalComponte } from "../../../index.js"
import { Button } from "@nextui-org/react"
import { PencilSquareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { AuthContext } from '../../../contexts/AuthContext.jsx'


// eslint-disable-next-line react/prop-types
export const VistaFichaTecnica = ({idMaquina})=>{
    
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { rol } = useContext(AuthContext)
    const isAdmin = rol === "Administrador"
  

    const handleEdit =()=>{
        navigate(`/listarFichaTecnica/${idMaquina}`)
    }

    const componenteModal = (
        <div className="flex flex-col space-y-4">
        <div className="flex justify-end space-x-2">

            {
                isAdmin && (
                    <Button
                    color="warning"
                    startContent={<PencilSquareIcon className="h-5 w-5" />}
                    className="text-white"
                    onClick={handleEdit}
                    >
                    {t('editar')}
                    </Button>
                )
            }

            <PDFDownloadLink
                document={<FichaTecnicaEquiposPDF idMaquina = {idMaquina}/>}
                fileName={`ficha-${idMaquina}.pdf`}
            >

                <Button
                color="success"
                startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
                className="text-white"
                >
                {t('descargar_pdf')}
                </Button>

            </PDFDownloadLink>

        </div>
        <div style={{ height: '70vh', width: '100%' }}>
            <PDFViewer style={{ width: "100%", height: "100%" }}>
                <FichaTecnicaEquiposPDF idMaquina = {idMaquina}/>
            </PDFViewer>
        </div>
        </div>
    )
    
    return (
        <>
            <ModalComponte
            buttonModal={t('fichaTecnica')}
            tittleModal={t('vistaPdf')}
            componente={componenteModal}
            size="5xl"
            variantButton="shadow"
            colorButton="success"
            classNames= "text-white" 
            />
        </>
    )
}