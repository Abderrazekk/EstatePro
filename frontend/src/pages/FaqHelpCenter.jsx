import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const FaqHelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation("supportPages");
  const faqs = t("faq.questions", { returnObjects: true });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t("faq.header.title")}{" "}
            <span className="italic font-serif text-stone-500 font-light">
              {t("faq.header.subtitle")}
            </span>
          </h1>
          <p className="text-lg text-stone-500 font-light leading-relaxed">
            {t("faq.header.description")}
          </p>
        </div>

        <div className="space-y-4 animate-fade-in-up delay-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${openIndex === index ? "border-stone-300 shadow-md" : "border-stone-200/60 hover:border-stone-300"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
              >
                <p className="text-stone-500 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqHelpCenter;
