import { Route, Routes } from "react-router-dom";

// paginas
import Fichas from "../../pages/admin/Fichas";
import { FichaSolicitudPage } from "../../pages/fichastecnicas/ViewFormFichaSolicitudPage";

export const SolicitudRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Fichas />} />
        <Route path="/registrar" element={<FichaSolicitudPage />} />
        <Route
          path="/settings"
          element={
            <>
              <div>hola como estas</div>
            </>
          }
        />
      </Routes>
    </>
  );
};
