import React from "react"


const CardMaquinas = ({placa, serial, tipoEquipo, estado, img}) => {
    return (
      <>
        <div className="card w-72 bg-gray-100 shadow-xl flex m-7 hover:drop-shadow-2xl static h-96 ">

          <div className="bg-white h-48 grid justify-items-center rounded-t-2xl">
            <figure className="rounded-t-2xl h-48"> {/* <ImgMaquinas img={img}/> */}aaa </figure> 
          </div>

          <div className="p-5 grid items-center h-48">
            aaa
           {/*  <InfoCard placa={placa} serial={serial} tipoEquipo={tipoEquipo} estado={estado}/> */}
          </div>

        </div>
      </>
    )
}
export default CardMaquinas  