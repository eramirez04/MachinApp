import Layout from '../components/template/Layout.jsx'
import TablaMaquinas from "../components/organisms/TablaMaquinas.jsx"
import { Link } from 'react-router-dom'
import { CardStyle } from "../components/molecules/CardStyle.jsx";

const Maquinas=()=>  {
  const titulos = [
    { name: "Fichas de Maquinas", url: "/crearfichaequipos" },
  ];

  return (
    <>
      <Layout titlePage="Maquinas">
      <Link className="">
        {titulos.map((ficha) => (
          <CardStyle
            key={ficha.name}
            titleCard={ficha.name}
            link={ficha.url}
            nameLink={"Crear ficha tecnica"}
          />
        ))}
      </Link>
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