import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation("supportPages");
  const sections = t("privacy.sections", { returnObjects: true });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white p-8 md:p-16 rounded-[2rem] border border-stone-200/60 shadow-sm animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            {t("privacy.title")}
          </h1>
          <p className="text-sm text-stone-500 font-bold tracking-widest uppercase mb-12">
            {t("privacy.lastUpdated")}
          </p>

          <div className="space-y-8 text-stone-600 font-light leading-relaxed">
            {sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className={section.list ? "mb-4" : ""}>{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
