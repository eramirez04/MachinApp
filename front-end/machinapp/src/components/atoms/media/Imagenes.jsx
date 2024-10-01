
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

export const  Imagenes  =  ({rutaImg})  => {   //Pasar ruta a partir de la carpeta public 

    let rutaImagen = `http://localhost:3000/${rutaImg}`

    const [estadoImg, setEstadoImg] = useState(false)

    useEffect(() => {
      
        const verificarImagen = async () => {
          try {            
            const response = await fetch(rutaImagen)

            if (response.ok) {
                setEstadoImg(true)
            } else {
                setEstadoImg(false)
            }
          } catch (error) {
            console.log(error)
            setEstadoImg(false)
          }
        }
    
        verificarImagen()
      }, [rutaImagen])

    return (
      <>
        {
            estadoImg ? (<img className='w-full rounded-2xl object-cover'  src={rutaImagen} alt="Imagen" />  ) : (<img src="http://localhost:3000/imagenes/noEncontrada.jpg" alt="Imagen" />)
        }
      </>
    )
}

Imagenes.propTypes = {
    rutaImg: PropTypes.string.isRequired     
}
