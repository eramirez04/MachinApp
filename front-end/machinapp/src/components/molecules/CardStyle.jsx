import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

// solo se va a trabajar con este componentes para las Cards
//

export const CardStyle = ({
  imagen,
  bodyContent,
  titleCard,
  subtitle,
  link,
  nameLink,
  children,
}) => {
  return (
    <>
      <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
        <CardHeader className="pb-2 pt-4 px-5 flex flex-col items-start space-y-1">
          <p className="text-xs uppercase font-semibold text-green-600 dark:text-purple-400">
            {subtitle}
          </p>
          <span className="font-bold text-lg text-gray-800 dark:text-white">
            {titleCard}
          </span>
        </CardHeader>
        <CardBody className="px-5 py-3 flex">
          {imagen && (
            <Image
              alt="Card background"
              className="object-cover bg-red-300 w-full h-48 rounded-lg"
              src={`http://127.0.0.1:8000/${imagen}`}
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
        <CardFooter className="px-5 py-3 flex justify-between items-center">
          <Link to={link}>{nameLink}</Link>
        </CardFooter>
      </Card>
    </>
  );
};
