import React from 'react'

const MostrarInfoUnica = ({titulo, valor})=> {
  return (
    <>
        <p className='text-sm'><b>{titulo}: </b> {valor}</p>
    </>
  )
}

export default MostrarInfoUnica