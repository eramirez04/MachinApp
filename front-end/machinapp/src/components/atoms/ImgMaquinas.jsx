import PropTypes from 'prop-types'

const ImgMaquinas = ({img}) => {


    
  let direccionImg

    if(img == ""){
        direccionImg = "http://localhost:3000/imagenes/ficha/noEncontrada.png"
    }
    else{
        direccionImg =  `http://localhost:3000/imagenes/ficha/${img}`
    }
    //const imageUrl = process.env.PUBLIC_URL + `/imagenes/ficha/${img}`
    return (
      <>
        <img  className="w-full" src={direccionImg} alt="maquina" />
      </>
    )
}

ImgMaquinas.propTypes = {
  img: PropTypes.string.isRequired
    
}

export default ImgMaquinas
