import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English Translations
import navbarEn from "./locales/en/navbar.json";
import heroEn from "./locales/en/hero.json";
import featuredPropertiesEn from "./locales/en/featuredProperties.json";
import propertyCardEn from "./locales/en/propertyCard.json";
import homeEn from "./locales/en/home.json";
import footerEn from "./locales/en/footer.json";
import sponsorsEn from "./locales/en/sponsors.json";
import propertiesListEn from "./locales/en/propertiesList.json";
import userPagesEn from "./locales/en/userPages.json";
import authPagesEn from "./locales/en/authPages.json";
import supportPagesEn from "./locales/en/supportPages.json";
import propertyDetailEn from "./locales/en/propertyDetail.json";

// Italian Translations
import navbarIt from "./locales/it/navbar.json";
import heroIt from "./locales/it/hero.json";
import featuredPropertiesIt from "./locales/it/featuredProperties.json";
import propertyCardIt from "./locales/it/propertyCard.json";
import homeIt from "./locales/it/home.json";
import footerIt from "./locales/it/footer.json";
import sponsorsIt from "./locales/it/sponsors.json";
import propertiesListIt from "./locales/it/propertiesList.json";
import userPagesIt from "./locales/it/userPages.json";
import authPagesIt from "./locales/it/authPages.json";
import supportPagesIt from "./locales/it/supportPages.json";
import propertyDetailIt from "./locales/it/propertyDetail.json";

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
        userPages: userPagesEn,
        authPages: authPagesEn,
        supportPages: supportPagesEn,
        propertyDetail: propertyDetailEn,
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
        userPages: userPagesIt,
        authPages: authPagesIt,
        supportPages: supportPagesIt,
        propertyDetail: propertyDetailIt,
      },
    },
    fallbackLng: "en",
    defaultNS: "navbar",
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
