import { ProviderContext } from "./contexts/IndexContext.jsx";
import { AppRouter } from "./index.js";
/* import { useAxioshttpErrorStatus } from "./service/api/AxioshttpError.jsx"; */

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  /*  useAxioshttpErrorStatus(); */

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        pauseOnHover
        draggable
        autoClose={2000}
      />
      <ProviderContext>
        <AppRouter />
      </ProviderContext>
    </>
  );
};

export default App;
