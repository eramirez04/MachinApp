import { ModalComponte } from "../../molecules/index.js"
import { Button } from "@nextui-org/react"
import { PencilSquareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
import {FichaTecnicaEquiposPDF} from "../../index.js"
import { useNavigate } from 'react-router-dom';


export const VistaFichaTecnica = ({idMaquina})=>{
    
    const navigate = useNavigate()

    const handleEdit =()=>{
        navigate(`/listarFichaTecnica/${idMaquina}`)
    }

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
                document={<FichaTecnicaEquiposPDF idMaquina = {idMaquina}/>}
                fileName={`ficha-${idMaquina}.pdf`}
            >

                <Button
                color="success"
                startContent={<DocumentArrowDownIcon className="h-5 w-5" />}
                className="text-white"
                >
                Descargar
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
            buttonModal="Ficha tecnica"
            tittleModal={`Vista previa del PDF`}
            componente={componenteModal}
            size="5xl"
            variantButton="shadow"
            colorButton="success"
            classNames= "text-white" 
            />
        </>
    )
}