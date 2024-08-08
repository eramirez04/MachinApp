import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useState, useEffect } from 'react'
// solo se va a trabajar con este componentes para las Cards
// eslint-disable-next-line react/prop-types
export const CardStyle = ({
  imagen,
  bodyContent,
  titleCard,
  subtitle,
  link,
  nameLink,
  children,
}) => {

  let rutaImagen = `http://localhost:3000/${imagen}`

  const [estadoImg, setEstadoImg] = useState(false)

  useEffect(() => {
      const verificarImagen = async () => {
        try {
          console.log(rutaImagen)
          const response = await fetch(rutaImagen)

          if (response.ok) {
              setEstadoImg(true)
          } else {
              setEstadoImg(false)
          }
        } catch (error) {
          setEstadoImg(false)
        }
      }
  
      verificarImagen()
    }, [rutaImagen])

  return (


    
    <>
      <Card radius="lg">
        <CardHeader className="pb-2 pt-4 px-5 flex flex-col items-start">
          <p className="text-xs uppercase font-semibold text-green-600 dark:text-purple-400">
            {subtitle}
          </p>
          <span className="font-bold text-lg text-gray-800 dark:text-white">
            {titleCard}
          </span>
        </CardHeader>
        <CardBody className="px-5 py-2 flex justify-center ">
          {imagen && (
            <Image
              alt="Card background"
              className="object-cover bg-red-300 w-full h-48 rounded-lg"
              src={ estadoImg ? (rutaImagen):(`http://localhost:3000/imagenes/noEncontrada.jpg`)}
              width={270}
              height={210}
            />
          )}
          {bodyContent}

          {children && (
            <div className="mt-3 text-gray-600 dark:text-gray-300">
              {children}
            </div>
          )}
        </CardBody>
        <CardFooter className="px-5 py-3 flex justify-between items-center ">
          <Link to={link}>{nameLink}</Link>
        </CardFooter>
      </Card>
    </>
  );
};
