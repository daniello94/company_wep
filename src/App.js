import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/stylesComponents/App.module.scss";
import LanguageContext from "./LanguageContext";
import Container from "./components/Container";
import { useTranslation } from "react-i18next";
import MainPage from "./routers/MainPage";
import AdministrationPanel from "./routers/AdministrationPanel";

export default function App() {
  const initialLanguage = localStorage.getItem('language') || "pl";
  const [language, setLanguage] = useState(initialLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const changeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <Container>
        <Routes>
          <Route path="/company_wep" element={<MainPage activeFlag={language} onSelectLangue={changeLanguage} />} />
          <Route path="/company_wep/administration" element={<AdministrationPanel />} />
        </Routes>
      </Container>
    </LanguageContext.Provider>
  );
}
