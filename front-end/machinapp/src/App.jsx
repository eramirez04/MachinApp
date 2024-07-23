import { ProviderContext } from "./contexts/IndexContext.jsx";
import { AppRouter } from "./router/Router.jsx";

const App = () => {
  return (
    <>
      <ProviderContext>
        <AppRouter />
      </ProviderContext>
    </>
  );
};

export default App;
