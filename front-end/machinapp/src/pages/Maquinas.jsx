import Layout from '../components/template/Layout.jsx'
import TablaMaquinas from "../components/organisms/TablaMaquinas.jsx"

const Maquinas=()=>  {

  return (
    <>
      <Layout titlePage="Maquinas">
          <div>
           {/*  <p>Simular ambiente</p>  
            <Link to={'maquinasAmb/8'} >  <button className="btn btn-active">Ambiente 8</button></Link> */}

            <div className='mx-11 my-7'>
              <p>(Hacer barra de busqueda)</p>
              <TablaMaquinas/>
            </div>

          </div>
        

      </Layout>    
    </>
  )
}

export default Maquinas