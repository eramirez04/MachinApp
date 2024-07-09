import React from 'react'

const  DescargarDocs = ({contenido, ruta, nombreDocumento})=> {
  return (
    <>
        <a target="_blank" href= {`http://localhost:3000/${ruta}/${nombreDocumento}`} download>{contenido}</a>
    </>
  )
}

export default DescargarDocs
