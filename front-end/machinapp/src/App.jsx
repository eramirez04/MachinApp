import { ProviderContext } from "./contexts/IndexContext.jsx";
import { AppRouter } from "./router/Router.jsx";
/* import { useAxioshttpErrorStatus } from "./service/api/AxioshttpError.jsx"; */

const App = () => {
 /*  useAxioshttpErrorStatus(); */
  return (
    <>
      <ProviderContext>
        <AppRouter />
      </ProviderContext>
    </>
  );
};

export default App;
