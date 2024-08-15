import Header from "../../components/molecules/Header";
import ModalComponte from "../../components/molecules/Modal";
import { FormUser } from "../../components/organisms/formularios/FormUser";
import Footer from "../../components/molecules/Footer";
import InputforForm from "../../components/molecules/InputForForm";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { axiosCliente } from "../../service/api/axios";
import { useState } from "react";

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleSubmitData = async (data) => {
    const numero_identificacion = data.Documento;
    /*  console.log(numero_identificacion); */
    try {
      setLoading(true);
      const res = await axiosCliente.post("user/recuperar", {
        numero_identificacion,
      });

      if (res) {
        const emailUser = String(res.data["correo_usuario: "]);
        reset();
        setEmail(emailUser);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        color={"bg-white"}
        contenido={
          <ModalComponte
            buttonModal={"Crea una Cuenta"}
            tittleModal={"Crea tu Cuenta"}
            componente={<FormUser />}
            colorButton="success"
            variantButton={"shadow"}
          />
        }
      />

      {/*  */}
      <section className="bg-gray-100 flex flex-col ">
        <div className="px-10 py-6">
          <span className="text-4xl font-bold text-gray-800 mb-4"></span>
          <div className="border-b-8 border-green-600 inline-block w-full"></div>
        </div>

        {/*   <!-- Imagen visible solo en pantallas grandes (1200px y mayores) --> */}

        <div className="w-full  flex items-center justify-center">
          <form
            onSubmit={handleSubmit(handleSubmitData)}
            className="w-full max-w-md flex flex-col gap-5 bg-white p-8 rounded-lg shadow-md"
          >
            <span className="font-semibold text-2xl lg:text-4xl text-custom-green">
              Restablecer contraseña
            </span>
            <span className="text-base lg:text-lg">
              Introduzca su número de documento
            </span>
            <InputforForm
              errors={errors}
              tipo={"number"}
              register={register}
              name={"Documento"}
            />
            <Button
              type="submit"
              isLoading={loading ? true : false}
              className="text-white bg-blue-600 mt-4"
            >
              Restablecer
            </Button>

            {email && (
              <div>
                la nueva contraseña fue enviada al correo:{" "}
                <span className="font-bold">{email}</span>{" "}
              </div>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

/* <div class="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
          
            <div class="w-full md:w-1/2 flex items-center justify-center p-4">
              
            </div>

            <div class="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-2xl font-semibold text-gray-800 mb-6">
                Formulario de Ejemplo
              </h2>
              <form>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 font-medium mb-2"
                  >
                    Correo Electrónico
                  </label>  
              us:ring-2 focus:ring-blue-600" required> 
                </div>

                <div class="mb-4">
                  <label
                    for="password"
                    class="block text-gray-700 font-medium mb-2"
                  >
                    Contraseña
                  </label>
                </div>

                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div> */
{
  /*  <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-4">
            <div className="relative w-full h-[300px] lg:h-full overflow-hidden rounded-lg">
              <LazyLoadImage
                src="Saved.jpeg"
                className="w-full h-full object-cover"
                effect="blur"
              />
            </div>
          </div> */
}
