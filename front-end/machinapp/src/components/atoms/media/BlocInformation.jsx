
export const BlocInformation = ({titulo, contenido})=> {
  return (
    <>
        <div className="  p-2 rounded-lg text-zinc-700 " >
            <p className=" mb-1 font-medium "> {titulo}</p>
            <p>{contenido}</p>
        </div>
    </>
  )
}
