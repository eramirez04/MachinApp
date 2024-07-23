
import Layout from "../components/template/Layout.jsx";
import ListarAreas from "../components/organisms/PanelConponents/PDCAcciones/ListarAreas.jsx"





const PaneldeControlAreas = () =>{



    return (
        <>
            <Layout titlePage={"Panel de control de areas"} >
                <div className="min-h-screen bg-gray-200">
                    <ListarAreas/>  
                </div>
            </Layout>


        </>
    )
}

export default PaneldeControlAreas