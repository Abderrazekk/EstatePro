import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactConcierge = () => {
  const { t } = useTranslation("supportPages");

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t("contact.header.title")}{" "}
            <span className="italic font-serif text-stone-500 font-light">
              {t("contact.header.subtitle")}
            </span>
          </h1>
          <p className="text-lg text-stone-500 font-light leading-relaxed">
            {t("contact.header.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-10 animate-fade-in-up delay-100">
            <div className="bg-white p-8 rounded-[2rem] border border-stone-200/60 shadow-sm space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {t("contact.details.call.title")}
                  </h3>
                  <p className="text-stone-500 font-light mb-2">
                    {t("contact.details.call.availability")}
                  </p>
                  <a
                    href="tel:+21671234567"
                    className="text-gray-900 font-bold hover:text-stone-500 transition-colors"
                  >
                    +216 71 234 567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {t("contact.details.email.title")}
                  </h3>
                  <p className="text-stone-500 font-light mb-2">
                    {t("contact.details.email.replyTime")}
                  </p>
                  <a
                    href="mailto:bonjour@darhote.tn"
                    className="text-gray-900 font-bold hover:text-stone-500 transition-colors"
                  >
                    bonjour@darhote.tn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {t("contact.details.office.title")}
                  </h3>
                  <p className="text-stone-500 font-light leading-relaxed">
                    {t("contact.details.office.addressLine1")}
                    <br />
                    {t("contact.details.office.addressLine2")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-stone-200/60 shadow-sm animate-fade-in-up delay-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("contact.form.title")}
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    {t("contact.form.firstName")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">
                    {t("contact.form.lastName")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" /> {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactConcierge;
