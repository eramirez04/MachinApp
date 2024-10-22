import { AuthProvider } from "./AuthContext";
import { GlobalDataProvider } from "./FetchDataGlobalContext";
import { TranslateProvider } from "./TranslationContext";
import PropTypes from "prop-types";

export const ProviderContext = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalDataProvider>
        <TranslateProvider>{children}</TranslateProvider>{" "}
      </GlobalDataProvider>
    </AuthProvider>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.element,
};
