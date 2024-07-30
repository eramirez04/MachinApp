import { Image } from "@nextui-org/react";
import { CardStyle } from "../../molecules/CardStyle";
import InputforForm from "../../molecules/InputForForm";
import { useForm } from "react-hook-form";
import { TextAreaComponent } from "../../atoms/Inputs/TextArea";
import ButtonNext from "../../atoms/buttons/ButtonNext";
import { Icons } from "../../atoms/icons/Icons";
import { PlusIcon } from "@heroicons/react/24/outline";

export const FormFichaSolicitud = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSubmitData = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center  h-full w-full">
        <form
          className="flex flex-col gap-8 w-11/12 pt-12"
          onSubmit={handleSubmit(handleSubmitData)}
        >
          <div className="flex flex-row">
            <figure className="flex-shrink-0 h-16 w-1/3 border flex justify-center items-center">
              <Image
                src="logoSenaNaranja.png"
                className="h-16 w-full object-contain"
                alt="logo-sena"
              />
            </figure>
            <div className="flex-grow text-center border px-4 text-base h-16 w-1/3 flex items-center justify-center">
              SOLICITUD DE SERVICIO DE MANTENIMIENTO
            </div>
            <div className="flex-shrink-0 w-1/3 h-16 border flex items-center">
              <p className="overflow-hidden overflow-ellipsis text-center">
                Centro de gestion y desarrollo sostenible surColombiano
              </p>
            </div>
          </div>
          <div className="border flex flex-col gap-9">
            <CardStyle
              titleCard={"Informacion de solicitante"}
              subtitle={"dfsdfdf"}
            >
              <div className="flex gap-10">
                {" "}
                <InputforForm
                  errors={errors}
                  name={"fdas"}
                  register={register}
                />
                <InputforForm
                  errors={errors}
                  name={"fdas"}
                  register={register}
                />
                <InputforForm
                  errors={errors}
                  name={"fdas"}
                  register={register}
                />
              </div>
            </CardStyle>

            <CardStyle subtitle={"dfdf"} titleCard={"ffdafd"}>
              <div className="flex">
                <TextAreaComponent
                  errors={errors}
                  register={register}
                  name={"faf"}
                />
              </div>
            </CardStyle>

            <div className="flex justify-end">
              <ButtonNext color="primary">
                <Icons icon={PlusIcon} /> fsdfds
              </ButtonNext>{" "}
            </div>

            <div>fasfsad</div>
          </div>
        </form>
      </div>
    </>
  );
};
