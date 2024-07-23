

const BlocInformation = ({titulo, contenido})=> {
  return (
    <>
        <div className="  p-2 rounded-lg  " >
            <p className="text-base mb-1 "> <b>{titulo}</b></p>
            <p >{contenido}</p>
        </div>
    </>
  )
}
export default BlocInformation  