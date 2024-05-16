import React, { useEffect, useState } from 'react';
import Api  from '../Api';
import { Link } from 'react-router-dom'

const TablaMaquina =()=>{
    
    const [maquinas, setMaquinas] = useState([])

    useEffect(()=>{

        const buscarInfo = async ()=>{

            try{
                const response = await Api.get('ficha/listar')
                setMaquinas(response.data)
                console.log(response.data)
    
            }catch(error){
                console.error('Error listando maquinas ')
            }
        }

        buscarInfo()
        
    }, [])

    return(
        <>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr className="bg-base-200">
                            <th>ID</th>
                            <th>Placa Sena</th>
                            <th>Serial</th>
                            <th>Estado</th>
                            <th>Ubicacion</th>
                            <th>Codigo QR</th>
                        </tr>
                        </thead>

                        <tbody>
                            {
                                maquinas.map((maquina)=>(
                                <tr key = {maquina.idFichas} >
                                    <td>
                                        <Link to= {`/maquinaInfo/${maquina.idFichas}`}><div className='rounded-full w-6 h-6 text-center border-2 border-green-500/40 hover:bg-green-300 '>{maquina.idFichas}</div></Link> 
                                    </td>
                                        
                                    <td>{maquina.fi_placa_sena}</td>
                                    <td>{maquina.fi_serial}</td>
                                    <td>{maquina.fi_estado}</td>
                                    <td>{maquina.sit_nombre}</td>
                                    <td>link</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TablaMaquina