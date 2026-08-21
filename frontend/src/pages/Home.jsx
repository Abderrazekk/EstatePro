import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import PromoBanner from "../components/PromoBanner";
import Sponsors from "../components/Sponsors";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Clock,
  HeartHandshake,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

const useScrollReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  return [setElement, isVisible];
};

const Home = () => {
  const { t } = useTranslation("home");
  const [promiseRef, promiseVisible] = useScrollReveal();
  const [destinationsRef, destinationsVisible] = useScrollReveal();
  const [conciergeRef, conciergeVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const destinations = [
    {
      queryParam: "Sidi Bou Saïd",
      name: t("destinations.items.sidiBouSaid.name"),
      tag: t("destinations.items.sidiBouSaid.tag"),
      image:
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
      stays: t("destinations.items.sidiBouSaid.stays"),
    },
    {
      queryParam: "Djerba Island",
      name: t("destinations.items.djerba.name"),
      tag: t("destinations.items.djerba.tag"),
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      stays: t("destinations.items.djerba.stays"),
    },
    {
      queryParam: "Tozeur & Nefta",
      name: t("destinations.items.tozeur.name"),
      tag: t("destinations.items.tozeur.tag"),
      image:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      stays: t("destinations.items.tozeur.stays"),
    },
    {
      queryParam: "Hammamet",
      name: t("destinations.items.hammamet.name"),
      tag: t("destinations.items.hammamet.tag"),
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      stays: t("destinations.items.hammamet.stays"),
    },
  ];

  const promiseItems = [
    {
      icon: ShieldCheck,
      title: t("promise.items.vetted.title"),
      desc: t("promise.items.vetted.desc"),
    },
    {
      icon: Clock,
      title: t("promise.items.locking.title"),
      desc: t("promise.items.locking.desc"),
    },
    {
      icon: HeartHandshake,
      title: t("promise.items.concierge.title"),
      desc: t("promise.items.concierge.desc"),
    },
  ];

  const conciergeFeatures = [
    t("concierge.features.breakfast"),
    t("concierge.features.walks"),
    t("concierge.features.transfers"),
    t("concierge.features.tea"),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <FeaturedProperties />

        {/* Tunisian Destinations Grid */}
        <section
          ref={destinationsRef}
          className="py-16 sm:py-28 bg-neutral-50/90 border-t border-b border-neutral-200/70 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000 transform ${
                destinationsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-black bg-white border border-neutral-300 px-5 py-2 rounded-full shadow-sm mb-6">
                <MapPin className="w-3.5 h-3.5 text-black" />
                {t("destinations.badge")}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
                {t("destinations.title.exploreBy")}{" "}
                <span className="font-serif italic font-normal text-neutral-400">
                  {t("destinations.title.destination")}
                </span>
              </h2>
              <p className="text-neutral-500 mt-3 sm:mt-5 font-light text-sm sm:text-lg">
                {t("destinations.subtitle")}
              </p>
            </div>

            {/* Destinations 2x2 on Mobile Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {destinations.map((dst, idx) => (
                <Link
                  key={dst.queryParam}
                  to={`/properties?location=${encodeURIComponent(dst.queryParam)}`}
                  className={`group relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden h-60 sm:h-96 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-700 transform hover:-translate-y-2 ${
                    destinationsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <img
                    src={dst.image}
                    alt={dst.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end text-white z-10">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-300 mb-0.5 sm:mb-1">
                      {dst.stays}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold font-serif mb-1 sm:mb-2 group-hover:text-neutral-200 transition-colors truncate">
                      {dst.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-neutral-300 font-light leading-relaxed line-clamp-2">
                      {dst.tag}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PromoBanner />

        {/* The Borgogo Luxury Promise */}
        <section
          ref={promiseRef}
          className="py-16 sm:py-28 bg-white relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className={`text-center max-w-3xl mx-auto mb-12 sm:mb-20 transition-all duration-1000 transform ${
                promiseVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-black bg-neutral-100 border border-neutral-300 px-5 py-2 rounded-full shadow-sm mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                {t("promise.badge")}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
                {t("promise.title.curatedFor")}{" "}
                <span className="font-serif italic font-normal text-neutral-400">
                  {t("promise.title.serenity")}
                </span>
              </h2>
              <p className="text-neutral-500 mt-4 sm:mt-6 text-sm sm:text-lg font-light leading-relaxed">
                {t("promise.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {promiseItems.map((item, idx) => (
                <div
                  key={item.title}
                  className={`group p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-neutral-200 bg-white hover:border-black hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-500 transform hover:-translate-y-2 ${
                    promiseVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500 border border-neutral-200">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-black mb-3 sm:mb-4 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-light text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concierge Section */}
        <section
          ref={conciergeRef}
          className="py-16 sm:py-28 bg-neutral-900 text-white overflow-hidden relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div
                className={`lg:col-span-6 transition-all duration-1000 transform ${
                  conciergeVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.25em] uppercase text-black bg-white px-5 py-2 rounded-full mb-6 sm:mb-8">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  {t("concierge.badge")}
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold font-serif mb-4 sm:mb-6 leading-tight">
                  {t("concierge.title.line1")} <br />
                  <span className="italic font-normal text-neutral-400">
                    {t("concierge.title.italic")}
                  </span>
                </h2>

                <p className="text-neutral-300 font-light leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  {t("concierge.subtitle")}
                </p>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  {conciergeFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-neutral-200">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl"
                >
                  <span>{t("concierge.button")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Visual Frame */}
              <div
                className={`lg:col-span-6 transition-all duration-1000 delay-300 transform ${
                  conciergeVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="relative rounded-2xl sm:rounded-[3rem] overflow-hidden border border-neutral-800 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                    alt="Concierge Experience"
                    className="w-full h-[320px] sm:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/80 backdrop-blur-2xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-white">
                        {t("concierge.satisfaction")}
                      </p>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      {t("concierge.verified")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Sponsors />

        {/* CTA Banner */}
        <section
          ref={ctaRef}
          className="bg-black py-16 sm:py-28 relative overflow-hidden text-white"
        >
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2
              className={`text-3xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-6 transition-all duration-1000 transform ${
                ctaVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {t("cta.title.ready")}{" "}
              <span className="font-serif italic font-normal text-neutral-400">
                {t("cta.title.italic")}
              </span>
            </h2>

            <p
              className={`text-neutral-400 text-sm sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 transition-all duration-1000 delay-150 transform ${
                ctaVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {t("cta.subtitle")}
            </p>

            <div
              className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-center transition-all duration-1000 delay-300 transform ${
                ctaVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="tel:+21671234567"
                className="w-full sm:w-auto bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
              >
                <Phone className="w-4 h-4" />
                <span>+216 71 234 567</span>
              </a>
              <a
                href="https://wa.me/21612345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-neutral-900 border border-neutral-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-extrabold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t("cta.whatsapp")}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
