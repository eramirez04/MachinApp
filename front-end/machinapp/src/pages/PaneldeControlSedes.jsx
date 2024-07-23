

import Layout from "../components/template/Layout.jsx";
import ListarSedes from "../components/organisms/PanelConponents/PDCAcciones/ListarSedes.jsx"





const PaneldeControlSedes = () =>{



    return (
        <>

            <Layout titlePage={"Panel de control de sedes"}>
                <div className="min-h-screen bg-gray-200">
                    <ListarSedes/> 
                </div>
                
            </Layout>


        </>
    )
}

export default PaneldeControlSedes