import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import navbarEn from "./locales/en/navbar.json";
import navbarIt from "./locales/it/navbar.json";
import heroEn from "./locales/en/hero.json";
import heroIt from "./locales/it/hero.json";
import featuredPropertiesEn from "./locales/en/featuredProperties.json";
import featuredPropertiesIt from "./locales/it/featuredProperties.json";
import propertyCardEn from "./locales/en/propertyCard.json";
import propertyCardIt from "./locales/it/propertyCard.json";
import homeEn from "./locales/en/home.json";
import homeIt from "./locales/it/home.json";
import footerEn from "./locales/en/footer.json";
import footerIt from "./locales/it/footer.json";
import sponsorsEn from "./locales/en/sponsors.json";
import sponsorsIt from "./locales/it/sponsors.json";
import propertiesListEn from "./locales/en/propertiesList.json";
import propertiesListIt from "./locales/it/propertiesList.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        navbar: navbarEn,
        hero: heroEn,
        featuredProperties: featuredPropertiesEn,
        propertyCard: propertyCardEn,
        home: homeEn,
        footer: footerEn,
        sponsors: sponsorsEn,
        propertiesList: propertiesListEn,
      },
      it: {
        navbar: navbarIt,
        hero: heroIt,
        featuredProperties: featuredPropertiesIt,
        propertyCard: propertyCardIt,
        home: homeIt,
        footer: footerIt,
        sponsors: sponsorsIt,
        propertiesList: propertiesListIt,
      },
    },
    fallbackLng: "en",
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
