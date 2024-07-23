import Layout from '../components/template/Layout.jsx'
import TablaMaquinas from "../components/organisms/TablaMaquinas.jsx"
import { Link } from 'react-router-dom'

const Maquinas=()=>  {

  return (
    <>
      <Layout titlePage="Maquinas">
          <div>
            <p>Simular ambiente</p>  
            <Link to={'/maquinasAmb/9'} >  <button className="btn btn-active">Ambiente 9</button></Link>

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