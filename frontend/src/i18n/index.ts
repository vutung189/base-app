import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEs from "./en.json";
import translationVi from "./vi.json";

//translations
const resources = {
  es: {
    translation: translationEs,
  },
  vi: {
    translation: translationVi,
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    returnNull: false,
    resources,
    lng: localStorage.getItem("i18nextLng") || "es",
    fallbackLng: "es", // use en if detected lng is not available
    // keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
