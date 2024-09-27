import { Header, Footer, ModalComponte, V, Login } from "../../index";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export const LayotuInicio = ({ children }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-screen">
        <Header
          color={"bg-white"}
          contenido={
            <ModalComponte
              buttonModal={t("iniciar_sesion")}
              tittleModal={t("iniciar_sesion")}
              colorButton={V.BtnRegistrar}
              size={"sm"}
              componente={<Login />}
            />
          }
        />
        {children}
      </div>
      <Footer />
    </>
  );
};

LayotuInicio.propTypes = {
  children: PropTypes.node,
};
