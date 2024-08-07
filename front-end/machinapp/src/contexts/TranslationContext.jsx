import { useState, createContext, useEffect } from "react";
import i18n from "../utils/translation/i18NextReact";
import PropTypes from "prop-types";

export const TranslateContext = createContext();

export const TranslateProvider = ({ children }) => {
  const [lenguage, setlenguege] = useState(() => {
    return localStorage.getItem("lenguage") || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(lenguage);
    localStorage.setItem("lenguage", lenguage);
  }, [lenguage]);

  const onChangeTransalate = (idioma) => {
    setlenguege(idioma);
  };

  const value = {
    onChangeTransalate,
    lenguage,
  };

  return (
    <TranslateContext.Provider value={value}>
      {children}
    </TranslateContext.Provider>
  );
};

TranslateProvider.propTypes = {
  children: PropTypes.element,
};
