
import ListarSitios from "../components/organisms/PanelConponents/PDCAcciones/ListarSitios.jsx"

import Layout from "../components/template/Layout.jsx";





const PaneldeControlSitios = () =>{



    return (
        <>
            <Layout titlePage={"Panel de control de sitios"}>
                <div className="min-h-screen bg-gray-200">
                    <ListarSitios/>
                </div>
                
            </Layout>


        </>
    )
}

export default PaneldeControlSitios